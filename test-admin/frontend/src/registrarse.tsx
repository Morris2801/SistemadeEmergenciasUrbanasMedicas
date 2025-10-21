import React, { useState, ChangeEvent, } from 'react';

const Registrarse: React.FC = () => {
    const [datos, setDatos] = useState({
        username: '',
        password: '',
        name: '',
        turno: '',
        phone: '',
        tipo: 'paramedico',
    });

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setDatos({ ...datos, [event.target.name]: event.target.value });
    };

    const validarPassword = (password: string) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{9,}$/;
        return regex.test(password);
    };

    const handleSendData = async () => {
        if (!datos.username || !datos.password || !datos.name) {
            alert('Por favor completa todos los campos obligatorios');
            return;
        }

        if (!validarPassword(datos.password)) {
            alert('La contraseña debe tener al menos 9 caracteres, una mayúscula, una minúscula y un número.');
            return;
        }
        
        console.log(import.meta.env.VITE_BACKEND)
        const request=await new Request(import.meta.env.VITE_BACKEND+"/registrarse",{
            method: 'POST',
            body: JSON.stringify(datos),
            headers: new Headers({ 'Content-Type': 'application/json' }),
        });
        try {
            const res = await fetch(request);
            if (res.status < 200 || res.status >= 300) {
                throw new Error(res.statusText);
            }
            alert('Usuario registrado exitosamente');
        } catch {
            alert('No se pudo registrar el usuario');
        }
    };

    return (
        <div>
            <h2>Registro de nuevos usuarios</h2>
            <form>
                <div>
                    <label>Usuario: </label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={datos.username}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Contraseña: </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={datos.password}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Nombre Completo: </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={datos.name}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Tipo de usuario:</label>
                    <select id="tipo" name="tipo" value={datos.tipo} onChange={handleChange}>
                        <option value="paramedico">Paramédico</option>
                        <option value="urbano">Respondiente de emergencias urbanas</option>
                        <option value="jefe">Jefe de turno</option>
                        <option value="admin">Administrador</option>
                    </select>
                </div>
                <div>
                    <label>Turno: </label>
                    <input
                        type="text"
                        id="turno"
                        name="turno"
                        value={datos.turno}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Teléfono: </label>
                    <input
                        type="text"
                        id="phone"
                        name="phone"
                        value={datos.phone}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <button type="button" onClick={handleSendData}>
                        Crear Usuario
                    </button>
                </div>
            </form>
            <button type="button" onClick={() => (window.location.href = "./login")}>
                Ir a Login
            </button>
        </div>
    );
};

export default Registrarse;