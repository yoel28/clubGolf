#!/bin/bash

url="https://cdg.zippyttech.com:8080/api/permissions/";
token="bk3ifapcpe8l03g6iq1su5md5efg29et";#dev

#Modulos-------------------------------------------------------------------------------------------------------------------------------------
declare -A Modulos;

#access-------------------------------------------------------------------------------------------------------------------------------------
Modulos[0,0]="ACCOUNT";		Modulos[0,1]="Cuentas";				Modulos[0,2]="account";
Modulos[1,0]="PERM";		Modulos[1,1]="Permisos";			Modulos[1,2]="permission";
Modulos[2,0]="ROLE";		Modulos[2,1]="Roles";				Modulos[2,2]="role";
Modulos[3,0]="USER";		Modulos[3,1]="Usuarios";			Modulos[3,2]="user";

#business-------------------------------------------------------------------------------------------------------------------------------------
Modulos[4,0]="EVENT";		Modulos[4,1]="Eventos";				Modulos[4,2]="event";
Modulos[5,0]="INFO";		Modulos[5,1]="Informacion";			Modulos[5,2]="info";
Modulos[6,0]="NOTIFY";		Modulos[6,1]="Notificaciones";		Modulos[6,2]="notification";
Modulos[7,0]="PARAM";		Modulos[7,1]="Parametros";			Modulos[7,2]="param";
Modulos[8,0]="RULE";		Modulos[8,1]="Reglas";				Modulos[8,2]="rule";

#catalog-------------------------------------------------------------------------------------------------------------------------------------
Modulos[9,0]="ANT";		    Modulos[9,1]="Antenas";			    Modulos[9,2]="antenna";
Modulos[10,0]="BRAND";		Modulos[10,1]="Marcas";				Modulos[10,2]="brand";
Modulos[11,0]="COMPANY";	Modulos[11,1]="Empresas";			Modulos[11,2]="company";
Modulos[12,0]="CONT";		Modulos[12,1]="Contratos";			Modulos[12,2]="contract";
Modulos[13,0]="LOC";		Modulos[13,1]="Ubicaciones";		Modulos[13,2]="location";
Modulos[14,0]="MOD";		Modulos[14,1]="Modelos";			Modulos[14,2]="model";
Modulos[15,0]="PRODUCT";	Modulos[15,1]="Productos";			Modulos[15,2]="product";
Modulos[16,0]="PRTYPE";		Modulos[16,1]="Tipo de producto";	Modulos[16,2]="productType";
Modulos[17,0]="QRCODE";		Modulos[17,1]="QR";				    Modulos[17,2]="qrcode";
Modulos[18,0]="RECORD";		Modulos[18,1]="Registros";			Modulos[18,2]="record";
Modulos[19,0]="STATE";		Modulos[19,1]="Estados";			Modulos[19,2]="state";
Modulos[20,0]="TAG";		Modulos[20,1]="Tags";				Modulos[20,2]="tag";
Modulos[21,0]="TRADE";		Modulos[21,1]="Tratos";				Modulos[21,2]="trade";
Modulos[22,0]="US_STATUS";	Modulos[22,1]="Estados de usuarios";Modulos[22,2]="userStatus";
Modulos[23,0]="US_TYPE";	Modulos[23,1]="tipos de usuarios";	Modulos[23,2]="userType";
Modulos[24,0]="VEH";		Modulos[24,1]="Vehiculos";			Modulos[24,2]="vehicle";
Modulos[25,0]="VEHTYPE";	Modulos[25,1]="Tipos de vehiculos";	Modulos[25,2]="vehicleType";
#process-------------------------------------------------------------------------------------------------------------------------------------
Modulos[26,0]="GETBACK";	Modulos[26,1]="Recepcion de productos";	Modulos[26,2]="getback";


#PREFIX			    Modulo			    Controlador
#Modulos[0,0]="";	Modulos[0,1]="";	Modulos[0,2]="";
for (( i=0; i<$((${#Modulos[@]}/3)); i++ ));
do
	echo -e "\n\n${Modulos[$i,0]}---${Modulos[$i,1]}---${Modulos[$i,2]}\n";
	curl  -H 'Content-Type: application/json' -H 'Accept: application/json' -H "Authorization: Bearer $token" -X POST -d "{'code':'${Modulos[$i,0]}_LIST'   ,'module':'${Modulos[$i,1]}','title':'Listar'     ,'controlador':'${Modulos[$i,2]}','accion':'index' ,'detail':'Listar elementos'}"  -k $url
	curl  -H 'Content-Type: application/json' -H 'Accept: application/json' -H "Authorization: Bearer $token" -X POST -d "{'code':'${Modulos[$i,0]}_ADD'    ,'module':'${Modulos[$i,1]}','title':'Agregar'    ,'controlador':'${Modulos[$i,2]}','accion':'save'  ,'detail':'Guardar elementos'}"  -k $url
	curl  -H 'Content-Type: application/json' -H 'Accept: application/json' -H "Authorization: Bearer $token" -X POST -d "{'code':'${Modulos[$i,0]}_UPDATE' ,'module':'${Modulos[$i,1]}','title':'Actualizar' ,'controlador':'${Modulos[$i,2]}','accion':'update','detail':'Actualizar elementos'}"  -k $url
	curl  -H 'Content-Type: application/json' -H 'Accept: application/json' -H "Authorization: Bearer $token" -X POST -d "{'code':'${Modulos[$i,0]}_DELETE' ,'module':'${Modulos[$i,1]}','title':'Eliminar'   ,'controlador':'${Modulos[$i,2]}','accion':'delete','detail':'Borrar elementos'}"  -k $url
	curl  -H 'Content-Type: application/json' -H 'Accept: application/json' -H "Authorization: Bearer $token" -X POST -d "{'code':'${Modulos[$i,0]}_FILTER' ,'module':'${Modulos[$i,1]}','title':'Filtrar'    ,'controlador':'${Modulos[$i,2]}','accion':''      ,'detail':'Filtrar elementos'}"  -k $url
	curl  -H 'Content-Type: application/json' -H 'Accept: application/json' -H "Authorization: Bearer $token" -X POST -d "{'code':'${Modulos[$i,0]}_SEARCH' ,'module':'${Modulos[$i,1]}','title':'Buscar'     ,'controlador':'${Modulos[$i,2]}','accion':'search','detail':'Buscar elementos'}"  -k $url
	curl  -H 'Content-Type: application/json' -H 'Accept: application/json' -H "Authorization: Bearer $token" -X POST -d "{'code':'${Modulos[$i,0]}_LOCK'   ,'module':'${Modulos[$i,1]}','title':'Bloquear'   ,'controlador':'${Modulos[$i,2]}','accion':'lock'  ,'detail':'Bloquear elementos'}"  -k $url
	curl  -H 'Content-Type: application/json' -H 'Accept: application/json' -H "Authorization: Bearer $token" -X POST -d "{'code':'${Modulos[$i,0]}_WARNING','module':'${Modulos[$i,1]}','title':'Advertencia','controlador':'${Modulos[$i,2]}','accion':''      ,'detail':'Mensaje de advertencia'}"  -k $url
	curl  -H 'Content-Type: application/json' -H 'Accept: application/json' -H "Authorization: Bearer $token" -X POST -d "{'code':'${Modulos[$i,0]}_AUDIT'  ,'module':'${Modulos[$i,1]}','title':'Auditar'    ,'controlador':'${Modulos[$i,2]}','accion':'audit' ,'detail':'Auditoria de elementos'}"  -k $url

done

#Menu------------------------------------------------------------------------------------------------------------------------------------------------------------------------
declare -A Menu;
Menu[0,0]="MEN_DASHBOARD";      Menu[0,1]="Dashboard";
Menu[1,0]="MEN_USER_STATUS";    Menu[1,1]="Estados de usuarios";
Menu[2,0]="MEN_COMPANY";        Menu[2,1]="Empresas";
Menu[3,0]="MEN_ANTENNA";        Menu[3,1]="Antenas";
Menu[4,0]="MEN_LOCATION";       Menu[4,1]="Ubicaciones";
Menu[5,0]="MEN_RECORD_IN_OUT";  Menu[5,1]="Registro de acceso";
Menu[6,0]="MEN_RECORD_LIST";    Menu[6,1]="Lista de registro";
Menu[7,0]="MEN_CONT";           Menu[7,1]="Contratos";

#PREFIX			    Title
#Menu[0,0]="";	    Menu[0,1]="";

for (( i=0; i<$((${#Menu[@]}/2)); i++ ));
do
	echo -e "\n\n${Menu[$i,0]}---${Menu[$i,1]}\n";
	curl  -H 'Content-Type: application/json' -H 'Accept: application/json' -H "Authorization: Bearer $token" -X POST -d "{'code':'${Menu[$i,0]}','module':' menu izquierda','title':'${Menu[$i,1]}','controlador':'','accion':'','detail':'Enlace a ${Menu[$i,1]}'}"  -k $url
done

#Otros------------------------------------------------------------------------------------------------------------------------------------------------------------------------
declare -A Otros;
Otros[0,0]="ACL_SAVE";	        Otros[0,1]="ACL";    Otros[0,2]="Guardar acl";   Otros[0,3]="permission";    Otros[0,4]="addAllToRole";     Otros[0,5]="Guardar acl"

#PREFIX			    Modulo          Titulo			    Controlador         accion
#Otros[0,0]="";	    Otros[0,1]="";	Otros[0,2]="";      Otros[0,3]="";      Otros[0,4]="";
for (( i=0; i<$((${#Menu[@]}/6)); i++ ));
do
	echo -e "\n\n${Menu[$i,0]}---${Menu[$i,1]}\n";
	curl  -H 'Content-Type: application/json' -H 'Accept: application/json' -H "Authorization: Bearer $token" -X POST -d "{'code':'${Menu[$i,0]}','module':'${Menu[$i,1]}','title':'${Menu[$i,2]}','controlador':'${Menu[$i,3]}','accion':'${Menu[$i,4]}','detail':'${Menu[$i,5]}'}"  -k $url
done



 



