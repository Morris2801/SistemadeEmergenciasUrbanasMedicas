# Guía de Instalación: MVP para Protección Civil de Alcaldía Cuajimalpa

## Guía completa de Instalación en dos computadoras

Se requiere una computadora para Frontend, otra para Backend, y una tercera como cliente para acceder a "servidores", al igual que un puerto Jump.

### 1. Preparación inicial en ambas computadoras

1. En ambas computadoras a instalar (1 para Frontend, otra para Backend), abrir carpeta con FileExplorer donde se requiere instalar (o en Powershell, navegar al directorio con `cd PATH`)
   - Si en File Explorer, click derecho en cualquier área de ventana sin archivo y 'Abrir en Terminal'

2. Verificar instalación de Git en computadora
   - En caso de que no exista, seguir instrucciones en https://git-scm.com/install/

3. Copiar y pegar comando:
   ```bash
   git clone https://github.com/Morris2801/SistemadeEmergenciasUrbanasMedicas.git
   ```

### 2. Instalación de Node.js

- **Si computadora es Linux**, copiar y pegar:
  ```bash
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
  . "$HOME/.nvm/nvm.sh"
  nvm install 22
  ```

- **Si computadora es Windows**: 
  - Ir a https://nodejs.org/en/download 
  - Click en instalador de Windows x64

### 3. Actualización del repositorio

Aún en terminal, escribir:
```bash
git pull origin main
```

### 4. Configuración de la Computadora A (Frontend)

En terminal copiar y pegar:

```bash
cd SistemadeEmergenciasUrbanasMedicas\test-admin\frontend\
npm install package.json
openssl genrsa -out frontend.key 4096
openssl req -x509 -new -key frontend.key -out frontend.crt -days 365
```

Crear archivo `.env`:
```bash
nano .env
```
Escribir: `VITE_BACKEND=https://localhost:3000`
Cerrar y guardar con CTRL+X y guardar con nombre '.env'

Continuar con:
```bash
cd src
npm run dev
```
Debería aparecer mensaje de éxito por parte de VITE y ruta de localhost:5173

### 5. Configuración de la Computadora B (Backend)

En terminal copiar y pegar:

```bash
cd SistemadeEmergenciasUrbanasMedicas\test-admin\backend
npm install package.json
openssl genrsa -out backend.key 4096
openssl req -x509 -new -key backend.key -out backend.crt -days 365
```

Crear archivo `.env`:
```bash
nano .env
```
Escribir:
```
DB=mongodb://127.0.0.1:27017/medic_app
JWTKEY=development-secret-key-12345
```
Cerrar y guardar con CTRL+X y guardar con nombre '.env'

### 6. Configuración de base de datos

1. Abrir archivo dentro de carpeta /backend llamado `mongodbStartScript.txt`, [CTRL+A, CTRL+C]
2. En terminal de computadora B, escribir:
   ```bash
   sudo systemctl start mongod
   mongosh
   use medic_app
   ```
3. Copiar y pegar texto de `mongodbStartScript.txt` y [ENTER] hasta que en línea de comando aparezca 'medic_app>' de nuevo y aparezca mensaje de confirmación de inserción de objetos

4. Finalizar configuración:
   ```bash
   npm install package.json
   node index.js
   ```
   Debería aparecer mensaje de confirmación de conexión a puerto 3000 y conexión a base de datos exitosa

### 7. Configuración de Computadora C (Cliente)

Abrir dos terminales:

**Terminal 1:**
```bash
ssh -L 5173:A.B.C.D:5173 jump@W.X.Y.Z
```
Para conectarse al jump server en la IP W.X.Y.Z, donde A.B.C.D es la dirección IP de la computadora A configurada previamente. De esta manera se crea un túnel a la computadora que está corriendo el frontend.

**Terminal 2:**
```bash
ssh -L 3000:A.B.C.D:3000 jump@W.X.Y.Z
```
Para conectarse al jump server en la IP W.X.Y.Z, donde A.B.C.D es la dirección IP de la computadora B configurada previamente. De esta manera se crea un túnel a la computadora que está corriendo el backend.

### 8. Acceso al sistema

1. En navegador, ingresar en la barra de búsqueda `https://localhost:3000`
   - Aparecerá una alerta de seguridad, es normal dado que el certificado de seguridad es auto-generado
   - Hacer click en 'Opciones avanzadas' y en 'Conectarse de todas formas'
   - Debería aparecer el mensaje 'Cannot GET /'

2. En la barra de búsqueda, ahora escribir `https://localhost:5173`
   - Debería cargar un momento, y finalmente llegar a la pantalla de Login

---

## Guía completa de Instalación en 1 sola computadora

### 1. Preparación inicial

1. Abrir carpeta con FileExplorer donde se requiere instalar (o en Powershell, navegar al directorio con `cd PATH`)
   - Si en File Explorer, click derecho en cualquier área de ventana sin archivo y 'Abrir en Terminal'

2. Verificar instalación de Git en computadora
   - En caso de que no exista, seguir instrucciones en https://git-scm.com/install/

3. Copiar y pegar comando:
   ```bash
   git clone https://github.com/Morris2801/SistemadeEmergenciasUrbanasMedicas.git
   ```

### 2. Instalación de Node.js

- **Si computadora es Linux**, copiar y pegar:
  ```bash
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
  . "$HOME/.nvm/nvm.sh"
  nvm install 22
  ```

- **Si computadora es Windows**: 
  - Ir a https://nodejs.org/en/download 
  - Click en instalador de Windows x64

### 3. Actualización del repositorio

Aún en terminal, escribir:
```bash
git pull origin main
```

### 4. Configuración del Frontend

En terminal copiar y pegar:

```bash
cd SistemadeEmergenciasUrbanasMedicas\test-admin\frontend
npm install package.json
openssl genrsa -out frontend.key 4096
openssl req -x509 -new -key frontend.key -out frontend.crt -days 365
```

Crear archivo `.env`:
```bash
nano .env
```
Escribir: `VITE_BACKEND=https://localhost:3000`
Cerrar y guardar con CTRL+X y guardar con nombre '.env'

Continuar con:
```bash
cd src
npm run dev
```
Debería aparecer mensaje de éxito por parte de VITE y ruta de localhost:5173

### 5. Configuración del Backend

En otra terminal, dentro del mismo directorio o carpeta, copiar y pegar:

```bash
cd SistemadeEmergenciasUrbanasMedicas\test-admin\backend
npm install package.json
openssl genrsa -out backend.key 4096
openssl req -x509 -new -key backend.key -out backend.crt -days 365
```

Crear archivo `.env`:
```bash
nano .env
```
Escribir:
```
DB=mongodb://127.0.0.1:27017/medic_app
JWTKEY=development-secret-key-12345
```
Cerrar y guardar con CTRL+X y guardar con nombre '.env'

### 6. Configuración de base de datos

1. Abrir archivo dentro de carpeta /backend llamado `mongodbStartScript.txt`, [CTRL+A, CTRL+C]
2. En terminal de computadora B aún, escribir:
   ```bash
   sudo systemctl start mongod
   mongosh
   use medic_app
   ```
3. Copiar y pegar texto de `mongodbStartScript.txt` y [ENTER] hasta que en línea de comando aparezca 'medic_app>' de nuevo y aparezca mensaje de confirmación de inserción de objetos

4. Finalizar configuración:
   ```bash
   npm install package.json
   node index.js
   ```
   Debería aparecer mensaje de confirmación de conexión a puerto 3000 y conexión a base de datos exitosa

### 7. Acceso al sistema

1. En navegador, ingresar en la barra de búsqueda `https://localhost:3000`
   - Aparecerá una alerta de seguridad, es normal dado que el certificado de seguridad es auto-generado
   - Hacer click en 'Opciones avanzadas' y en 'Conectarse de todas formas'
   - Debería aparecer el mensaje 'Cannot GET /'

2. En la barra de búsqueda, ahora escribir `https://localhost:5173`
   - Debería cargar un momento, y finalmente llegar a la pantalla de Login, punto en el cual ya se podrá hacer uso de la plataforma
   - Referirse a manual de uso para más información



---

--- 

# Manual de Usuario del Sistema de Atención Prehospitalaria y Emergencias Urbanas

## Índice
1. [Introducción](#introducción)
2. [Roles de Usuario](#roles-de-usuario)
3. [Accesos por Rol](#accesos-por-rol)
4. [Instrucciones de Acceso](#instrucciones-de-acceso)
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

## Introducción
Este sistema permite registrar, consultar y administrar información relacionada con **emergencias urbanas** y **atención prehospitalaria** para la **alcaldía de Cuajimalpa**.  
Cada usuario tiene funciones específicas definidas por su rol dentro del sistema.

---

## Roles de Usuario

| Rol | Descripción |
|-----|--------------|
|  **Paramédico** | Puede crear y consultar reportes de emergencias. |
|  **Jefe de Turno** | Visualiza todos los reportes registrados, sin editar. |
|  **Administrador** | Acceso total a reportes, estadísticas y gestión de usuarios. |
|  **Operador** | Responsable del ingreso inicial de datos (dependiendo de implementación). |

---

## Accesos por Rol

| Funcionalidad | Admin | Paramedico | Jefe de Turno | Operador |
|----------------|:------:|:-----------:|:--------------:|:----------:|
| Ver Dashboard | ✅ | ❌ | ❌ | ❌ |
| Ver estadísticas | ✅ | ❌ | ❌ | ❌ |
| Crear / Editar / Eliminar reportes | ✅ | ✅ | ❌ | ❌ |
| Ver reportes | ✅ | ✅ | ✅ | ❌ |
| Crear usuarios nuevos | ✅ | ❌ | ❌ | ❌ |

---

##  Instrucciones de Acceso

###  Cómo ingresar al sistema
El sistema se encuentra disponible a través del navegador web en la siguiente dirección:  
 **http://127.0.0.1:5173/**  

También puede abrirse como aplicación local desde la interfaz de desarrollo (React + Vite).

###  Requisitos técnicos
- **Navegador recomendado:** Google Chrome (v110+) o Microsoft Edge  
- **Conexión:** estable a Internet o red local  
- **Cuenta de usuario:** proporcionada por el Administrador  

###  Proceso de inicio de sesión
1. Ingrese a la URL del sistema.  
2. Escriba su usuario y contraseña.  
3. Presione el botón **“Iniciar sesión”**.  
4. Si las credenciales son correctas, accederá al panel principal.  

 *Recuperación de contraseña:* comuníquese con el Administrador del sistema para restablecerla desde el módulo de usuarios.

---

##  Guía de Uso por Rol

### **Paramédico**
1. Desde el panel principal, seleccione **“Emergencia Médica”**.  
2. Haga clic en **“Crear nuevo reporte”**.  
3. Complete los campos del formulario:
   - Datos del paciente (nombre, edad, sexo, etc.)
   - Información del servicio (folio, hora, operador, prioridad)
   - Signos vitales y tratamientos.  
4. Presione **“Guardar”**.  
5. Puede editar posteriormente su reporte con el botón ✏️ **Editar**.

---

###  **Administrador**
- Ingrese a **“Panel de control” → “Usuarios”**.  
- Puede:
  - Crear, editar o eliminar usuarios.  
  - Consultar estadísticas por fecha o tipo de servicio.  
  - Exportar reportes en formato **CSV** (botón “Exportar CSV”).  
- También puede acceder a formularios médicos o urbanos para revisión general.

---

###  **Operador**
1. Entre al módulo **“Emergencias” → “Nuevo registro”**.  
2. Capture los datos iniciales:
   - Folio, turno, hora y dirección del evento.  
   - Tipo de servicio (traumatismo, enfermedad, etc.).  
3. Guarde el registro para que el paramédico lo complete posteriormente.

---

###  **Jefe de Turno**
1. Ingrese al menú **“Reportes”**.  
2. Use los filtros superiores (fecha, operador, prioridad, condición).  
3. Visualice los reportes con el botón 👁️ **Ver**, despúes aparecera la opción de editar si es necesario.
4. Puede exportar los registros visibles en formato CSV.

---

##  Explicación de la Interfaz

###  Menú principal
- **Inicio:** vuelve al selector de módulos.  
- **Emergencia Médica:** reportes del personal paramédico.  
- **Emergencia Urbana:** reportes de protección civil o bomberos.  
- **Usuarios (solo admin):** gestión de cuentas.  
- **Salir:** cerrar sesión.  

###  Significado de iconos y colores

| Ícono / Color | Significado |
|---------------|-------------|
| 🔵 Botón azul | Acción principal (guardar, exportar, ver) |
| 👁️ | Ver detalles del reporte |
| ✏️ | Editar reporte existente |

###  Navegación
- Los módulos se abren en pestañas o secciones laterales.  
- Los filtros permiten buscar por folio, operador o fecha.  
- El diseño es **responsivo**, adaptándose a vista móvil o escritorio.

---

##  Gestión de Datos

### ✅ Guardar un reporte
- Complete todos los campos obligatorios (*).  
- Presione **Guardar**.  
- Aparecerá el mensaje:  
  `Reporte guardado correctamente.`

### ✏️ Editar o eliminar
- Use el botón **Editar** desde el listado.  
- Solo el **Administrador** puede eliminar registros.

### Exportar información
- Use el botón **Exportar CSV** (parte superior derecha).  
- Se descargará un archivo compatible con **Excel** o **Google Sheets**.

### !!! Si se cierra sesión sin guardar
Los cambios **no se conservan**.  
El sistema guarda la información **solo al presionar “Guardar”**.

---

## ¡¡ Errores Comunes y Soluciones !!

| Problema | Posible causa | Solución |
|-----------|----------------|-----------|
| No se guarda un reporte | Faltan campos obligatorios | Revisar que todos los campos marcados con * estén completos antes de guardar |
| “401 Unauthorized” | Sesión expirada o usuario no autenticado | Cerrar sesión y volver a iniciar con su usuario y contraseña |
| Error de conexión | Internet inestable o servidor temporalmente fuera de servicio | Revisar conexión a internet o esperar unos minutos y volver a intentar |
| Exportar CSV no descarga | El navegador bloquea descargas automáticas | Permitir descargas o pop-ups para este sitio desde la configuración del navegador |
| La página se queda cargando | El sistema tarda en responder o hay exceso de registros | Refrescar la página o aplicar filtros de búsqueda para mostrar menos resultados |
| No aparece un registro recién creado | Aún no se actualiza la lista | Presionar el botón de “Actualizar” o recargar la página |
| “No se encontró el registro” | El registro fue eliminado o modificado por otro usuario | Verificar con el administrador o revisar nuevamente la lista completa |
| Contraseña incorrecta | Error al escribir la contraseña | Revisar mayúsculas/minúsculas y volver a intentar |
| El sistema se cierra solo | Tiempo de sesión vencido (15 minutos) | Volver a iniciar sesión; se recomienda guardar cambios con frecuencia |
| Botón de guardar no responde | Campos con formato inválido o navegador bloqueando envío | Revisar mensajes en pantalla y validar los datos ingresados |


---

##  Módulo: Atención Prehospitalaria
*(Sección resumida para contexto — ver formulario completo en documentación técnica)*  

Permite registrar y gestionar la atención médica, incluyendo datos de servicio, paciente, parto, causas clínicas o traumáticas, evaluación inicial y secundaria, traslado, tratamiento, observaciones y datos legales.

---

##  Módulo: Emergencias Urbanas
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

##  Módulo: Administración
Permite:
- Gestionar usuarios y roles  
- Consultar estadísticas generales  
- Acceder a reportes médicos o urbanos  

---

##  Formulario Médico - Detalle del Reporte
Integra todos los campos clínicos y operativos necesarios para la atención prehospitalaria y registro de emergencias.

---

##  Soporte Técnico
Para incidencias técnicas, errores o recuperación de acceso, comuníquese con el **Administrador del sistema** o con el **equipo de soporte técnico** de la alcaldía.

---

> **Desarrollado para:** Alcaldía de Cuajimalpa  
> **Tecnologías:** React, Node.js, MongoDB  
> **Propósito:** Optimizar la gestión de emergencias y atención prehospitalaria urbana.
