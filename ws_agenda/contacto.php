<?php
include('config.php');

// Configurar encabezados
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With, Origin, Accept');
header('Content-Type: application/json; charset=utf-8');

// Leer el cuerpo de la solicitud
$post = json_decode(file_get_contents('php://input'), true);

// Verificar si hay acción definida
if (!isset($post['accion'])) {
    echo json_encode(['code' => 400, 'response' => 'No action provided', 'estado' => false]);
    exit;
}

// Variables globales
$respuesta = [];
$data = [];

// Acciones según el valor de 'accion'
switch ($post['accion']) {
    case 'consultar':
        $sql = sprintf("SELECT * FROM contacto WHERE persona_cod_persona = '%s'",
        mysqli_real_escape_string($conn, $post['codigo']));
        $query = mysqli_query($conn, $sql);

        if ($query && mysqli_num_rows($query) > 0) {
            while ($row = mysqli_fetch_assoc($query)) {
                $data[] = [
                    'codigo_contacto' => $row['cod_contacto'],
                    'nombre_contacto' => $row['nom_contacto'],
                    'apellido_contacto' => $row['ape_contacto'],
                    'telefono_contacto' => $row['telefono_contacto'],
                    'correo_contacto' => $row['email_contacto'],
                    'cod_persona' => $row['persona_cod_persona']
                ];
            }
            $respuesta = ['code' => 200, 'response' => 'Data fetched successfully', 'estado' => true, 'data' => $data];
        } else {
            $respuesta = ['code' => 400, 'response' => 'No data found', 'estado' => false];
        }
        break;

    case 'insertar':

        $telefono = mysqli_real_escape_string($conn, $post['telefono_contacto']);
        $check_sql = "SELECT * FROM contacto WHERE telefono_contacto = '$telefono'";
        $check_query = mysqli_query($conn, $check_sql);
        $result = mysqli_num_rows($check_query);

        if($result > 0){

            $respuesta = ['code' => 409, 'response' => 'El número de teléfono ya está registrado', 'estado' => false];
            //exit;
        }else{

        $sql = sprintf(
            "INSERT INTO contacto (nom_contacto, ape_contacto, telefono_contacto, email_contacto, persona_cod_persona)
            VALUES ('%s', '%s', '%s', '%s', '%s')",
            mysqli_real_escape_string($conn, $post['nombre_contacto']),
            mysqli_real_escape_string($conn, $post['apellido_contacto']),
            mysqli_real_escape_string($conn, $post['telefono_contacto']),
            mysqli_real_escape_string($conn, $post['correo_contacto']),
            mysqli_real_escape_string($conn, $post['cod_persona'])
        );
        $query = mysqli_query($conn, $sql);

        $respuesta = $query
            ? ['code' => 200, 'response' => 'Data inserted successfully', 'estado' => true]
            : ['code' => 400, 'response' => 'Failed to insert data', 'estado' => false];

        }
        break;

    case 'actualizar':
        $sql = sprintf(
            "UPDATE contacto SET nom_contacto='%s', ape_contacto='%s', telefono_contacto='%s', email_contacto='%s'
            WHERE cod_contacto='%s'",
            mysqli_real_escape_string($conn, $post['nombre_contacto']),
            mysqli_real_escape_string($conn, $post['apellido_contacto']),
            mysqli_real_escape_string($conn, $post['telefono_contacto']),
            mysqli_real_escape_string($conn, $post['correo_contacto']),
            mysqli_real_escape_string($conn, $post['cod_contacto'])
        );
        $query = mysqli_query($conn, $sql);

        $respuesta = $query
            ? ['code' => 200, 'response' => 'Data updated successfully', 'estado' => true]
            : ['code' => 400, 'response' => 'Failed to update data', 'estado' => false];
        break;

    case 'eliminar':
        $sql = sprintf(
            "DELETE FROM contacto WHERE cod_contacto='%s'",
            mysqli_real_escape_string($conn, $post['cod_contacto'])
        );
        $query = mysqli_query($conn, $sql);

        $respuesta = $query
            ? ['code' => 200, 'response' => 'Data deleted successfully', 'estado' => true]
            : ['code' => 400, 'response' => 'Failed to delete data', 'estado' => false];
        break;

    case 'dato':
        $sql = sprintf(
            "SELECT * FROM persona WHERE cod_persona='%s'",
            mysqli_real_escape_string($conn, $post['codigo'])
        );
        $query = mysqli_query($conn, $sql);

        if ($query && mysqli_num_rows($query) > 0) {
            while ($row = mysqli_fetch_assoc($query)) {
                $data[] = [
                    'codigo' => $row['cod_persona'],
                    'nombre' => $row['nom_persona'],
                    'apellido' => $row['ape_persona'],
                    'cedula' => $row['ci_persona'],
                    'correo' => $row['correo_persona'],
                    'clave' => $row['clave_persona']
                ];
            }
            $respuesta = ['code' => 200, 'response' => 'Data fetched successfully', 'estado' => true, 'data' => $data];
        } else {
            $respuesta = ['code' => 400, 'response' => 'No data found', 'estado' => false];
        }
        break;

    default:
        $respuesta = ['code' => 400, 'response' => 'Invalid action', 'estado' => false];
        break;
}

// Devolver la respuesta en formato JSON
echo json_encode($respuesta);
