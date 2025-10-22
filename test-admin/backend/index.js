const express = require("express");
const MongoClient = require("mongodb").MongoClient;
var cors = require("cors");
const bodyParser = require("body-parser");
const argon2 = require("argon2")
const jwt = require("jsonwebtoken")
const fs = require("fs");
const https = require("https");
const { ObjectId } = require("mongodb");

const app = express();
app.use(cors());
const PORT = 3000;
let db;
app.use(bodyParser.json());

function mapMongoToReactAdmin(doc) {
    return { ...doc, id: doc._id.toString(), _id: undefined };
}

// ---------------------- FUNCION DE LOG ----------------------
async function ToLog(sujeto, objeto, accion) {
    try {
        if (!sujeto) sujeto = "desconocido";
        const registro = {
            timestamp: new Date(),
            sujeto,
            objeto,
            accion,
        };
        await db.collection("logMedic").insertOne(registro);
    } catch (err) {
        console.error("Error al registrar log:", err);
    }
}
// ------------------------------------------------------------

// ------------------------- medicForm -------------------------
app.get("/medicForm", async (req, res) => {
    try {
        let token = req.get("Authentication");
        let verifiedToken = await jwt.verify(token, await process.env.JWTKEY);
        let user = verifiedToken.username;
        const { _start, _end, _sort, _order, q, ...otherFilters } = req.query;
        const collection = db.collection("medicForm");

        // CONSTRUIR FILTRO PARA FECHAS Y UBICACIONES
        let filter = {};
        
        if (q) {
            filter.$or = [
                { folio: { $regex: q, $options: "i" } },
                { paciente_nombre: { $regex: q, $options: "i" } },
                { calle: { $regex: q, $options: "i" } },
                { personal_a_cargo: { $regex: q, $options: "i" } }
            ];
        }
        
        Object.keys(otherFilters).forEach(key => {
            if (otherFilters[key] && otherFilters[key] !== '') {
                if (key.includes('fecha') || key.includes('hora')) {
                    const dateValue = new Date(otherFilters[key]);
                    if (!isNaN(dateValue.getTime())) {
                        filter[key] = {
                            $gte: new Date(dateValue.setHours(0, 0, 0, 0)),
                            $lt: new Date(dateValue.setHours(23, 59, 59, 999))
                        };
                    }
                } else {
                    filter[key] = { $regex: otherFilters[key], $options: "i" };
                }
            }
        });

        const sort = {};
        if (_sort && _order) {
            sort[_sort] = _order.toLowerCase() === "asc" ? 1 : -1;
        } else {
            sort.fecha = -1; 
        }


        const total = await collection.countDocuments(filter);

        const reports = await collection
            .find(filter)
            .sort(sort)
            .skip(parseInt(_start) || 0)
            .limit(parseInt(_end) - parseInt(_start) || 10)
            .toArray();
        const formatted = reports.map(mapMongoToReactAdmin);
        
        res.set("Access-Control-Expose-Headers", "X-Total-Count");
        res.set("X-Total-Count", total.toString());

        await ToLog(user, "medicForm", "leer lista");
        res.json(formatted);
    } catch (error) {
        console.error("Error fetching medicForm:", error);
        res.sendStatus(401);
    }
});

// getOne
app.get("/medicForm/:id", async (req, res) => {
    try {
        let token = req.get("Authentication");
        let verifiedToken = await jwt.verify(token, await process.env.JWTKEY);
        let user = verifiedToken.username;

        const { id } = req.params;
        if (!ObjectId.isValid(id)) return res.status(400).json({ error: "Invalid ID format" });
        const report = await db.collection("medicForm").findOne({ _id: new ObjectId(id) });
        if (!report) return res.status(404).json({ error: "Report not found" });

        await ToLog(user, "medicForm", "leer uno");
        res.json(mapMongoToReactAdmin(report));
    } catch (error) {
        console.error("Error fetching medicForm report:", error);
        res.status(500).json({ error: "Server error" });
    }
});

// createOne
app.post("/medicForm", async (req, res) => {
    try {
        let token = req.get("Authentication");
        let verifiedToken = await jwt.verify(token, await process.env.JWTKEY);
        let user = verifiedToken.username;

        const newReport = req.body;
        delete newReport.id;
        delete newReport._id;
        const result = await db.collection("medicForm").insertOne(newReport);
        const createdReport = await db.collection("medicForm").findOne({ _id: result.insertedId });
        if (!createdReport) return res.status(500).json({ error: "Failed to retrieve created report" });

        await ToLog(user, "medicForm", "crear");
        res.status(201).json(mapMongoToReactAdmin(createdReport));
    } catch (error) {
        console.error("Error creating report:", error);
        res.status(500).json({ error: "Server error" });
    }
});

// deleteOne
app.delete("/medicForm/:id", async (req, res) => {
    try {
        let token = req.get("Authentication");
        let verifiedToken = await jwt.verify(token, await process.env.JWTKEY);
        let user = verifiedToken.username;

        const { id } = req.params;
        if (!ObjectId.isValid(id)) return res.status(400).json({ error: "Invalid ID" });
        const result = await db.collection("medicForm").deleteOne({ _id: new ObjectId(id) });
        if (result.deletedCount === 0) return res.status(404).json({ error: "Report not found" });

        await ToLog(user, "medicForm", "eliminar");
        res.json({ id });
    } catch (error) {
        console.error("Error deleting report:", error);
        res.status(500).json({ error: "Server error" });
    }
});

// updateOne
app.put("/medicForm/:id", async (req, res) => {
    try {
        let token = req.get("Authentication");
        let verifiedToken = await jwt.verify(token, await process.env.JWTKEY);
        let user = verifiedToken.username;

        const { id } = req.params;
        if (!ObjectId.isValid(id)) return res.status(400).json({ error: "Invalid ID" });
        const updatedData = { ...req.body };
        delete updatedData.id;
        delete updatedData._id;
        const result = await db.collection("medicForm").updateOne({ _id: new ObjectId(id) }, { $set: updatedData });
        if (result.matchedCount === 0) return res.status(404).json({ error: "Report not found" });
        const report = await db.collection("medicForm").findOne({ _id: new ObjectId(id) });

        await ToLog(user, "medicForm", "actualizar");
        res.json(mapMongoToReactAdmin(report));
    } catch (error) {
        console.error("Error updating report:", error);
        res.status(500).json({ error: "Server error" });
    }
});

async function connectToDB() {
    let client = new MongoClient(await process.env.DB);
    await client.connect();
    db = client.db();
    console.log("conectado a la base de datos");
}


app.post("/registrarse", async (req, res) => {
    let user = req.body.username;
    let pass = req.body.password;
    let name = req.body.name;
    let tipo = req.body.tipo;
    let turno = req.body.turno;
    let phone = req.body.phone;
    let data = await db.collection("users").findOne({ "username": user })
    if (data == null) {
        const hash = await argon2.hash(pass, { type: argon2.argon2id, memoryCost: 19 * 1024, timeCost: 2, parallelism: 1, saltLength: 16 })
        let usuarioAgregar = { "username": user, "password": hash, "name": name, "tipo": tipo, "turno": turno, "phone": phone }
        data = await db.collection("users").insertOne(usuarioAgregar);
        res.sendStatus(201);
    } else {
        res.sendStatus(403)
    }
})

// --------------------- urbanForms|
app.get("/urbanForm", async (req, res) => {
    try {
        let token = req.get("Authentication");
        let verifiedToken = await jwt.verify(token, await process.env.JWTKEY);
        let user = verifiedToken.username;

        const { _start, _end, _sort, _order, q, turno, gravedad, modo_activacion, fecha_hora } = req.query;
        
        const collection = db.collection("urbanForm");
        let filter = {};
        
        // Text search
        if (q) {
            filter.$or = [
                { folio: { $regex: q, $options: "i" } },
                { personal_a_cargo: { $regex: q, $options: "i" } },
                { tipo_servicio: { $regex: q, $options: "i" } }
            ];
        }
        if (turno) filter.turno = { $regex: turno, $options: "i" };
        if (gravedad) filter.gravedad = { $regex: gravedad, $options: "i" };
        if (modo_activacion) filter.modo_activacion = { $regex: modo_activacion, $options: "i" };
        if (fecha_hora) {
            const dateValue = new Date(fecha_hora);
            if (!isNaN(dateValue.getTime())) {
                filter.fecha_hora = {
                    $gte: new Date(dateValue.setHours(0, 0, 0, 0)),
                    $lt: new Date(dateValue.setHours(23, 59, 59, 999))
                };
            }
        }
        const sort = {};
        if (_sort && _order) sort[_sort] = _order === "ASC" ? 1 : -1;
        const total = await collection.countDocuments(filter);
        
        const reports = await collection
            .find(filter)
            .sort(sort)
            .skip(parseInt(_start) || 0)
            .limit(parseInt(_end) - parseInt(_start) || 10)
            .toArray();
        const formatted = reports.map(mapMongoToReactAdmin);
        res.set("Access-Control-Expose-Headers", "X-Total-Count");
        res.set("X-Total-Count", total.toString());

        await ToLog(user, "urbanForm", "leer lista");
        res.json(formatted);
    } catch (error) {
        console.error("Error fetching urbanForm list:", error);
        res.sendStatus(401);
    }
});

app.get("/urbanForm/:id", async (req, res) => {
    try {
        let token = req.get("Authentication");
        let verifiedToken = await jwt.verify(token, await process.env.JWTKEY);
        let user = verifiedToken.username;

        const { id } = req.params;
        if (!ObjectId.isValid(id)) return res.status(400).json({ error: "Invalid ID format" });
        const report = await db.collection("urbanForm").findOne({ _id: new ObjectId(id) });
        if (!report) return res.status(404).json({ error: "Report not found" });

        await ToLog(user, "urbanForm", "leer uno");
        res.json(mapMongoToReactAdmin(report));
    } catch (error) {
        console.error("Error fetching urbanForm report:", error);
        res.status(500).json({ error: "Server error" });
    }
});

app.post("/urbanForm", async (req, res) => {
    try {
        let token = req.get("Authentication");
        let verifiedToken = await jwt.verify(token, await process.env.JWTKEY);
        let user = verifiedToken.username;

        const newReport = req.body;
        delete newReport.id;
        delete newReport._id;
        const result = await db.collection("urbanForm").insertOne(newReport);
        const createdReport = await db.collection("urbanForm").findOne({ _id: result.insertedId });
        if (!createdReport) return res.status(500).json({ error: "Failed to retrieve created report" });

        await ToLog(user, "urbanForm", "crear");
        res.status(201).json(mapMongoToReactAdmin(createdReport));
    } catch (error) {
        console.error("Error creating urbanForm report:", error);
        res.status(500).json({ error: "Server error" });
    }
});

app.put("/urbanForm/:id", async (req, res) => {
    try {
        let token = req.get("Authentication");
        let verifiedToken = await jwt.verify(token, await process.env.JWTKEY);
        let user = verifiedToken.username;

        const { id } = req.params;
        if (!ObjectId.isValid(id)) return res.status(400).json({ error: "Invalid ID" });
        const updatedData = { ...req.body };
        delete updatedData.id;
        delete updatedData._id;
        const result = await db.collection("urbanForm").updateOne({ _id: new ObjectId(id) }, { $set: updatedData });
        if (result.matchedCount === 0) return res.status(404).json({ error: "Report not found" });
        const report = await db.collection("urbanForm").findOne({ _id: new ObjectId(id) });

        await ToLog(user, "urbanForm", "actualizar");
        res.json(mapMongoToReactAdmin(report));
    } catch (error) {
        console.error("Error updating urbanForm report:", error);
        res.status(500).json({ error: "Server error" });
    }
});

app.delete("/urbanForm/:id", async (req, res) => {
    try {
        let token = req.get("Authentication");
        let verifiedToken = await jwt.verify(token, await process.env.JWTKEY);
        let user = verifiedToken.username;

        const { id } = req.params;
        if (!ObjectId.isValid(id)) return res.status(400).json({ error: "Invalid ID" });
        const result = await db.collection("urbanForm").deleteOne({ _id: new ObjectId(id) });
        if (result.deletedCount === 0) return res.status(404).json({ error: "Report not found" });

        await ToLog(user, "urbanForm", "eliminar");
        res.json({ id });
    } catch (error) {
        console.error("Error deleting urbanForm report:", error);
        res.status(500).json({ error: "Server error" });
    }
});

// ----------------------------- USERS -----------------------------
app.get("/users", async (req, res) => {
    try {
        let token = req.get("Authentication");
        let verifiedToken = await jwt.verify(token, await process.env.JWTKEY);
        let user = verifiedToken.username;
const { _start, _end, _sort, _order, q, tipo, turno } = req.query;
        const collection = db.collection("users");
        
        let filter = {};
        if (q) {
            filter.$or = [
                { username: { $regex: q, $options: "i" } }, 
                { name: { $regex: q, $options: "i" } }
            ];
        }
        
        if (tipo) {
            filter.tipo = tipo;
        }
        if (turno) {
            filter.turno = turno;
        }

        const sort = {};
        if (_sort && _order) {
            sort[_sort] = _order === "ASC" ? 1 : -1;
        } else {
            sort.name = 1; 
        }

        const total = await collection.countDocuments(filter);
        const users = await collection
            .find(filter)
            .sort(sort)
            .skip(parseInt(_start) || 0)
            .limit(parseInt(_end) - parseInt(_start) || 10)
            .toArray();
        const formatted = users.map((u) => ({
            id: u._id.toString(),
            username: u.username,
            name: u.name,
            tipo: u.tipo,
            turno: u.turno,
            phone: u.phone,
        }));
        res.set("Access-Control-Expose-Headers", "X-Total-Count");
        res.set("X-Total-Count", total.toString());
        await ToLog("sistema", "users", "leer lista");
        res.json(formatted);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "Server error" });
    }
});

app.get("/users/:id", async (req, res) => {
    try {
        let token = req.get("Authentication");
        let verifiedToken = await jwt.verify(token, await process.env.JWTKEY);
        let user2 = verifiedToken.username;

        const { id } = req.params;
        if (!ObjectId.isValid(id)) return res.status(400).json({ error: "Invalid ID format" });
                const user = await db.collection("users").findOne({ _id: new ObjectId(id) });
        
        if (!user) return res.status(404).json({ error: "User not found" });
        await ToLog("sistema", "users", "leer uno");
        res.json({
            id: user._id.toString(),
            username: user.username,
            name: user.name,
            tipo: user.tipo,
            turno: user.turno,
            phone: user.phone,
        });
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ error: "Server error" });
    }
});

app.post("/users", async (req, res) => {
    try {
        let token = req.get("Authentication");
        let verifiedToken = await jwt.verify(token, await process.env.JWTKEY);
        let user = verifiedToken.username;

        const { username, password, name, tipo, turno, phone } = req.body;
        const existingUser = await db.collection("users").findOne({ username });
        if (existingUser) return res.status(400).json({ error: "Username already exists" });
        const hashedPassword = await argon2.hash(password, {
            type: argon2.argon2id,
            memoryCost: 19 * 1024,
            timeCost: 2,
            parallelism: 1,
            saltLength: 16,
        });
        const newUser = { username, password: hashedPassword, name, tipo, turno, phone };
        const result = await db.collection("users").insertOne(newUser);
        await ToLog(username, "users", "crear");
        res.status(201).json({ id: result.insertedId.toString(), ...newUser, password: undefined });
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ error: "Server error" });
    }
});

app.put("/users/:id", async (req, res) => {
    try {
        let token = req.get("Authentication");
        let verifiedToken = await jwt.verify(token, await process.env.JWTKEY);
        let user2 = verifiedToken.username;

        const { id } = req.params;
        if (!ObjectId.isValid(id)) return res.status(400).json({ error: "Invalid ID" });
        const updated = { ...req.body };
        delete updated.id;
        delete updated._id;
        if (updated.password) {
            updated.password = await argon2.hash(updated.password, {
                type: argon2.argon2id,
                memoryCost: 19 * 1024,
                timeCost: 2,
                parallelism: 1,
                saltLength: 16,
            });
        } else {
            delete updated.password;
        }
        const result = await db.collection("users").updateOne({ _id: new ObjectId(id) }, { $set: updated });
        if (result.matchedCount === 0) return res.status(404).json({ error: "User not found" });

        const user = await db.collection("users").findOne({ _id: new ObjectId(id) });
        await ToLog(user.username, "users", "actualizar");
        res.json({
            id: user._id.toString(),
            username: user.username,
            name: user.name,
            tipo: user.tipo,
            turno: user.turno,
            phone: user.phone,
        });
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ error: "Server error" });
    }
});

app.delete("/users/:id", async (req, res) => {
    try {
        let token = req.get("Authentication");
        let verifiedToken = await jwt.verify(token, await process.env.JWTKEY);
        let user = verifiedToken.username;

        const { id } = req.params;
        if (!ObjectId.isValid(id)) return res.status(400).json({ error: "Invalid ID" });
        const result = await db.collection("users").deleteOne({ _id: new ObjectId(id) });
        if (result.deletedCount === 0) return res.status(404).json({ error: "User not found" });
        await ToLog("sistema", "users", "eliminar");
        res.json({ id });
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ error: "Server error" });
    }
});

// ------------ login

app.post("/login", async (req, res) => {
    let user = req.body.username;
    let pass = req.body.password;
    let data = await db.collection("users").findOne({ "username": user });
    if (data == null) {
        res.sendStatus(401);
    } else if (await argon2.verify(data.password, pass)) {
        let token = jwt.sign({ "username": data.username }, await process.env.JWTKEY, { expiresIn: 900 })
        res.json({ "token": token, "id": data._id, "nombre": data.name, "tipo": data.tipo });
    } else {
        res.sendStatus(401);
    }
})
/*
app.listen(PORT, () => {
    connectToDB();
    console.log("aplicacion corriendo en puerto 3000");
});
*/
const options = {
    key: fs.readFileSync('backend.key'),
    cert: fs.readFileSync('backend.crt')
};

https.createServer(options, app).listen(3000, async() =>{
    await process.loadEnvFile(".env");
    connectToDB();
    console.log("HTTPS Server on port 3000");
});