
///TODO: La clase esta muy primitiva. Modificarla y prepararla para CRUD
export class Task {

    static fromJSON({duty, id, isComplete, madeAt}) {

        const tempTask = new Task( duty );
        tempTask.id = id;
        tempTask.isComplete = isComplete;
        tempTask.madeAt = madeAt;

        return tempTask;
    }

    constructor( tarea ){

        this.duty       = tarea;
        this.id         = new Date().getTime();         // Cambiar por uuid + date
        this.isComplete = false;
        this.madeAt     = new Date();

    }

    /*set duty( d ){
        this.duty = d;
    }*/
}