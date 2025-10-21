# 🧾 Manual de Usuario del Sistema de Atención Prehospitalaria y Emergencias Urbanas

## 📚 Índice
1. [Introducción](#introducción)
2. [Roles de Usuario](#roles-de-usuario)
3. [Accesos por Rol](#accesos-por-rol)
4. [Instrucciones de Acceso](#🖥️-instrucciones-de-acceso)
5. [Guía de Uso por Rol](#👣-guía-de-uso-por-rol)
6. [Explicación de la Interfaz](#🧭-explicación-de-la-interfaz)
7. [Gestión de Datos](#💾-gestión-de-datos)
8. [Errores Comunes y Soluciones](#⚠️-errores-comunes-y-soluciones)
9. [Módulo: Atención Prehospitalaria](#🚑-módulo-atención-prehospitalaria)
10. [Módulo: Emergencias Urbanas](#🚒-módulo-emergencias-urbanas)
11. [Módulo: Administración](#⚙️-módulo-administración)
12. [Formulario Médico - Detalle del Reporte](#🩺-formulario-médico---detalle-del-reporte)
13. [Soporte Técnico](#🛠️-soporte-técnico)

---

## 🩺 Introducción
Este sistema permite registrar, consultar y administrar información relacionada con **emergencias urbanas** y **atención prehospitalaria** para la **alcaldía de Cuajimalpa**.  
Cada usuario tiene funciones específicas definidas por su rol dentro del sistema.

---

## 👥 Roles de Usuario

| Rol | Descripción |
|-----|--------------|
| 🧑‍⚕ **Paramédico** | Puede crear y consultar reportes de emergencias. |
| 👨‍✈ **Jefe de Turno** | Visualiza todos los reportes registrados, sin editar. |
| 🧑‍💼 **Administrador** | Acceso total a reportes, estadísticas y gestión de usuarios. |
| 📞 **Operador** | Responsable del ingreso inicial de datos (dependiendo de implementación). |

---

## 🔐 Accesos por Rol

| Funcionalidad | Admin | Paramedico | Jefe de Turno | Operador |
|----------------|:------:|:-----------:|:--------------:|:----------:|
| Ver Dashboard | ✅ | ❌ | ❌ | ❌ |
| Ver estadísticas | ✅ | ❌ | ❌ | ❌ |
| Crear / Editar / Eliminar reportes | ✅ | ✅ | ❌ | ❌ |
| Ver reportes | ✅ | ✅ | ✅ | ❌ |
| Crear usuarios nuevos | ✅ | ❌ | ❌ | ❌ |

---

## 🖥️ Instrucciones de Acceso

### 🔗 Cómo ingresar al sistema
El sistema se encuentra disponible a través del navegador web en la siguiente dirección:  
👉 **http://127.0.0.1:5173/**  

También puede abrirse como aplicación local desde la interfaz de desarrollo (React + Vite).

### ⚙️ Requisitos técnicos
- **Navegador recomendado:** Google Chrome (v110+) o Microsoft Edge  
- **Conexión:** estable a Internet o red local  
- **Cuenta de usuario:** proporcionada por el Administrador  

### 🔐 Proceso de inicio de sesión
1. Ingrese a la URL del sistema.  
2. Escriba su usuario y contraseña.  
3. Presione el botón **“Iniciar sesión”**.  
4. Si las credenciales son correctas, accederá al panel principal.  

💡 *Recuperación de contraseña:* comuníquese con el Administrador del sistema para restablecerla desde el módulo de usuarios.

---

## 👣 Guía de Uso por Rol

### 👨‍⚕️ **Paramédico**
1. Desde el panel principal, seleccione **“Emergencia Médica”**.  
2. Haga clic en **“Crear nuevo reporte”**.  
3. Complete los campos del formulario:
   - Datos del paciente (nombre, edad, sexo, etc.)
   - Información del servicio (folio, hora, operador, prioridad)
   - Signos vitales y tratamientos.  
4. Presione **“Guardar”**.  
5. Puede editar posteriormente su reporte con el botón ✏️ **Editar**.

---

### 🧑‍💼 **Administrador**
- Ingrese a **“Panel de control” → “Usuarios”**.  
- Puede:
  - Crear, editar o eliminar usuarios.  
  - Consultar estadísticas por fecha o tipo de servicio.  
  - Exportar reportes en formato **CSV** (botón “Exportar CSV”).  
- También puede acceder a formularios médicos o urbanos para revisión general.

---

### 📞 **Operador**
1. Entre al módulo **“Emergencias” → “Nuevo registro”**.  
2. Capture los datos iniciales:
   - Folio, turno, hora y dirección del evento.  
   - Tipo de servicio (traumatismo, enfermedad, etc.).  
3. Guarde el registro para que el paramédico lo complete posteriormente.

---

### 🚒 **Jefe de Turno**
1. Ingrese al menú **“Reportes”**.  
2. Use los filtros superiores (fecha, operador, prioridad, condición).  
3. Visualice los reportes con el botón 👁️ **Ver**, despúes aparecera la opción de editar si es necesario.
4. Puede exportar los registros visibles en formato CSV.

---

## 🧭 Explicación de la Interfaz

### 🧩 Menú principal
- **Inicio:** vuelve al selector de módulos.  
- **Emergencia Médica:** reportes del personal paramédico.  
- **Emergencia Urbana:** reportes de protección civil o bomberos.  
- **Usuarios (solo admin):** gestión de cuentas.  
- **Salir:** cerrar sesión.  

### 🎨 Significado de iconos y colores

| Ícono / Color | Significado |
|---------------|-------------|
| 🔵 Botón azul | Acción principal (guardar, exportar, ver) |
| 👁️ | Ver detalles del reporte |
| ✏️ | Editar reporte existente |

### 🧭 Navegación
- Los módulos se abren en pestañas o secciones laterales.  
- Los filtros permiten buscar por folio, operador o fecha.  
- El diseño es **responsivo**, adaptándose a vista móvil o escritorio.

---

## 💾 Gestión de Datos

### ✅ Guardar un reporte
- Complete todos los campos obligatorios (*).  
- Presione **Guardar**.  
- Aparecerá el mensaje:  
  `✅ Reporte guardado correctamente.`

### ✏️ Editar o eliminar
- Use el botón **Editar** desde el listado.  
- Solo el **Administrador** puede eliminar registros.

### 📦 Exportar información
- Use el botón **Exportar CSV** (parte superior derecha).  
- Se descargará un archivo compatible con **Excel** o **Google Sheets**.

### ⚠️ Si se cierra sesión sin guardar
Los cambios **no se conservan**.  
El sistema guarda la información **solo al presionar “Guardar”**.

---

## ⚠️ Errores Comunes y Soluciones

| Problema | Posible causa | Solución |
|-----------|----------------|-----------|
| ❌ No se guarda un reporte | Campos obligatorios vacíos | Verificar los campos marcados con * |
| 🚫 “401 Unauthorized” | Sesión expirada o token inválido | Cerrar sesión y volver a iniciar |
| 🌐 Error de conexión | Internet inestable o backend caído | Revisar conexión o reiniciar servidor Node |
| 📦 Exportar CSV no descarga | Navegador bloquea pop-ups | Permitir descargas automáticas |
| 🔄 Página se queda cargando | Backend o BD sin respuesta | Revisar consola del servidor (nodemon) |

---

## 🚑 Módulo: Atención Prehospitalaria
*(Sección resumida para contexto — ver formulario completo en documentación técnica)*  

Permite registrar y gestionar la atención médica, incluyendo datos de servicio, paciente, parto, causas clínicas o traumáticas, evaluación inicial y secundaria, traslado, tratamiento, observaciones y datos legales.

---

## 🚒 Módulo: Emergencias Urbanas
Gestiona eventos como incendios, colapsos o explosiones.  
Campos principales:
- Folio  
- Fecha, hora y turno  
- Ubicación geográfica  
- Tipo de emergencia  
- Activación (llamada o seguimiento)  
- Tiempo de atención y recorrido  
- Dictamen y observaciones  
- Autoridades participantes  
- Fotografías (opcional)

---

## ⚙️ Módulo: Administración
Permite:
- Gestionar usuarios y roles  
- Consultar estadísticas generales  
- Acceder a reportes médicos o urbanos  

---

## 🩺 Formulario Médico - Detalle del Reporte
Integra todos los campos clínicos y operativos necesarios para la atención prehospitalaria y registro de emergencias.

---

## 🛠️ Soporte Técnico
Para incidencias técnicas, errores o recuperación de acceso, comuníquese con el **Administrador del sistema** o con el **equipo de soporte técnico** de la alcaldía.

---

> **Desarrollado para:** Alcaldía de Cuajimalpa  
> **Tecnologías:** React, Node.js, MongoDB  
> **Propósito:** Optimizar la gestión de emergencias y atención prehospitalaria urbana.
