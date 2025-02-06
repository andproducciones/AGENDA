# 📘 AGENDA FINAL - EXAMEN FINAL

## 📌 Descripción del Proyecto
Este proyecto es un sistema de **gestión de usuarios y contactos** desarrollado con **Ionic, Angular, PHP y MySQL**. Permite el registro, inicio de sesión, recuperación de contraseña, edición de perfil y administración de contactos con medidas de seguridad y validaciones.

## 🚀 Tecnologías Utilizadas
- **Backend:** PHP con MySQL para la gestión de datos.
- **Frontend:** Angular + Ionic para la interfaz de usuario.

---

## 📌 Funcionalidades Principales

### 🛠️ **Gestión de Usuarios**

#### ✅ **Registro de Usuarios (Crear Cuenta)**
- Validación de cédula única (no repetida en la base de datos).
- Confirmación de contraseña (comparación de los campos password y confirmPassword).
- La cuenta solo se crea si todos los campos cumplen con las validaciones.

#### 🔐 **Inicio de Sesión**
- Se verifica la combinación de **cédula** y **contraseña**.
- Si el usuario ingresa datos incorrectos, tiene un máximo de **3 intentos**.
- **Bloqueo temporal:** después de 3 intentos fallidos, la cuenta se bloquea temporalmente por un periodo definido.

#### 🔄 **Recuperación de Contraseña**
- Mecanismo de recuperación de contraseña mediante **correo electrónico**.
- El usuario recibe un enlace seguro para restablecer su contraseña.

#### 📜 **Menú Hamburguesa**
- Una vez autenticado, el usuario accede a un menú lateral con:
  - **Nombre del usuario** (obtenido desde la sesión).
  - **Gestión de contactos.**
  - **Opción para cerrar sesión.**

---

## 📌 **Gestión de Contactos**

### 📖 **Visualización de Contactos**
- Se muestra una **lista de todos los contactos del usuario**.
- Cada contacto contiene:
  - Nombre
  - Apellido
  - Número de teléfono
  - Correo electrónico

### ➕ **Agregar Contacto**
- Se permite añadir **nuevos contactos**.
- **Restricción:** No se permite la duplicidad de números de teléfono.
  - **✅ Confirmación incluida:** Si el número ya existe, muestra un mensaje de error y no permite guardar.

### ✏️ **Editar Contacto**
- Posibilidad de **modificar** los datos de un contacto existente.

### ❌ **Eliminar Contacto**
- **Confirmación antes de eliminar:** Se muestra un cuadro de diálogo para evitar eliminaciones accidentales.

---

## 📌 **Interfaz y Estilos**
- La aplicación cuenta con un **diseño unificado** en todas sus secciones.
- Implementación de **nuevos estilos mejorados** en toda la agenda.
- Se incluye una **pantalla de apertura inicial antes del login**, proporcionando una introducción a la aplicación antes del acceso.

---

## 📦 **Instalación y Configuración**
### 🔹 **Requisitos Previos**
- Tener **Node.js** y **Ionic CLI** instalados en tu sistema.
- Tener un servidor con **PHP y MySQL** configurado.

### 🔹 **Pasos de Instalación**
1. **Clonar el repositorio:**
   ```sh
   git clone https://github.com/tu_usuario/tu_repositorio.git
   cd tu_repositorio
   ```

2. **Instalar dependencias del frontend:**
   ```sh
   npm install
   ```

3. **Configurar el backend:**
   - Importar la base de datos desde el archivo `database.sql`.
   - Configurar la conexión a la base de datos en `backend/config.php`.

4. **Ejecutar la aplicación:**
   ```sh
   ionic serve
   ```

---

## 📜 **Créditos**
Proyecto desarrollado por **Francis Fiallos** para el **examen final** de **Agenda Final**.

---

## 🏷️ Versión
**1.0**