var miDBAlumnos = openDatabase('dbAlumnos','1.0','Aplicacion de Añumnos',5*1024*1024);
window.id = 0;
if(!miDBAlumnos){
    alert("Elnavegador no soporta Web SQL");
}
var appVue = new Vue({
    el:'#appRegistroAlumnos',
    data:{
        producto:{
            idAlumno            : 0,
            codigo              : '',
            nombre              : '',
            direccion           : '',
            municipio           : '',
            departamento        : '',
            telefono            : '',
            fecha_de_nacimiento : '',
            sexo                : '',
            grado               : '',
            responsable         : '',
            img                 : '/images/No-image-available.png',
            img2                : '/images/No-image-available.png'
        },
        alumno:[]
    },
    methods:{
        guardarAlumno(){
            /**
             * BD Web SQL
             */
            miDBAlumnos.transaction(tran=>{
                tran.executeSql('INSERT INTO productos(idAlumno,nombre,edad,sexo,grado,responsable,img) VALUES(?,?,?,?,?,?,?,?) ',
                    [++id,this.alumno.codigo, this.alumno.nombre,this.alumno.direccion,this.alumno.municipio,this.alumno.departamento,this.alumno.telefono,this.alumno.fecha_de_nacimiento,this.alumno.sexo, this.alumno.img]);
                this.obtenerAlumnos();
                this.limpiar();
            }, err=>{
                console.log( err );
            });
        },
        obtenerImg(e){
            //IMG 1
            let rutaTemp = URL.createObjectURL(e.target.files[0]);
            this.producto.img = rutaTemp;
            //IMG2
            /*rutaTemp = URL.createObjectURL(e.target.files[1]);
            this.alumno.img2 = rutaTemp;*/
        },
        obtenerAlumnos(){
            miDBAlumnos.transaction(tran=>{
                tran.executeSql('SELECT * FROM alumnos',[],(index,data)=>{
                    this.alumnos = data.rows;
                    id=data.rows.length;
                });
            }, err=>{
                console.log( err );
            });
        },
        mostrarAlumno(pro){
            this.alumno = pro;
        },
        limpiar(){
            this.alumno.codigo='';
            this.alumno.nombre='';
            this.alumno.direccion='';
            this.alumno.municipio='';
            this.alumno.departamento='';
            this.alumno.telefono='';
            this.alumno.fecha_de_nacimiento='';
            this.alumno.sexo='';
            this.alumno.img='';
        }
    },
    created(){
        miDBAlumnos.transaction(tran=>{
            tran.executeSql('CREATE TABLE IF NOT EXISTS alumnos(idAlumno int PRIMARY KEY NOT NULL, codigo varchar(10), nombre varchar(65), direccion varchar(65), municipio varchar(65), fecha de nacimiento varchar(65),precio number(4,2),img varchar(100))');
        }, err=>{
            console.log( err );
        });
        this.obtenerAlumnos();
    }
});