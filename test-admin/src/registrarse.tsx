import React, { useState, ChangeEvent, } from 'react';

const Registrarse: React.FC = () => {
    const [datos, setDatos] = useState({
        username: '',
        password: '',
        nombre: '',
        turno: '',
        phone: '',
        tipo: 'paramedico',
    });

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setDatos({ ...datos, [event.target.name]: event.target.value });
    };

    const handleSendData = async () => {
        const request = new Request('http://127.0.0.1:3000/registrarse', {
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
                    <label htmlFor="username">Usuario: </label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={datos.username}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="password">Contraseña: </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={datos.password}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="nombre">Nombre Completo: </label>
                    <input
                        type="text"
                        id="nombre"
                        name="nombre"
                        value={datos.nombre}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="tipo">Tipo de usuario:</label>
                    <select id="tipo" name="tipo" value={datos.tipo} onChange={handleChange}>
                        <option value="paramedico">Paramédico</option>
                        <option value="urbano">Respondiente de emergencias urbanas</option>
                        <option value="jefe">Jefe de turno</option>
                        <option value="admin">Administrador</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="turno">Turno: </label>
                    <input
                        type="text"
                        id="turno"
                        name="turno"
                        value={datos.turno}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="phone">Teléfono: </label>
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