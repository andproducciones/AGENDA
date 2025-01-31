# AGENDA2
# SEMANA 7 AGENDA
# Francis Fiallos
Este proyecto tiene como objetivo la creación de un sistema básico de gestión de usuarios, que incluye registro, inicio de sesión, recuperación de contraseña y edición de perfil. A continuación, se describen los puntos principales implementados.

Funcionalidades Principales
Registro de Usuarios (Crear Cuenta)

Validación de formulario:
Cédula no repetida (verificación contra la base de datos o un repositorio de usuarios).
Confirmación de contraseña (comparación de campos password y confirmPassword).
Solo se permite la creación de la cuenta si todos los campos están validados correctamente.
Inicio de Sesión

Se verifica la combinación de cédula y contraseña.
Si el usuario ingresa datos incorrectos, se le da un máximo de 3 intentos.
Al superar los 3 intentos fallidos, la cuenta se bloquea temporalmente por un periodo de tiempo definido, impidiendo más intentos de inicio de sesión.
Recuperación de Contraseña

Se implementa un mecanismo de recuperación de la contraseña (puede ser mediante correo electrónico, preguntas de seguridad o cualquier otro método escogido).
El usuario puede restablecer su contraseña siguiendo el proceso definido (por ejemplo, recibiendo un enlace de restablecimiento).
Menú Hamburguesa

Una vez autenticado, se muestra un menú tipo hamburguesa.
Muestra:
Nombre de la persona (obtenido al momento de la sesión).
Opciones de Perfil y Cerrar Sesión.
Proporciona una navegación sencilla y clara dentro de la aplicación.
Perfil de Usuario y Edición de Datos

Al seleccionar la opción Perfil, se presenta un formulario con todos los datos del usuario.
El usuario puede modificar su información personal (nombre, correo, teléfono, etc.) excepto la cédula, que no es editable.
La cédula se mantiene como valor único de identificación.