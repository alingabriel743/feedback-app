import { Sequelize } from 'sequelize';
const sequelize = new Sequelize('feedback', 'root', 'Divizibilitate', {
    host: 'localhost',
    dialect: 'mysql',
    define: {
        timestamps: false
    }
});

const Student = sequelize.define('student', {
    id:{
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true
    },
    nume: {
        type: Sequelize.STRING,
        allowNull: false
    },
    prenume: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

const Feedback = sequelize.define("feedback", {
    id:{
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true
    },
    tip: {
        type: Sequelize.STRING,
        allowNull: false
    },
    data:{
        type: Sequelize.DATE,
        allowNull: false
    }
});

const Curs = sequelize.define("curs", {
    id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    denumire: {
        type: Sequelize.STRING,
        allowNull: false
    },
    data: {
        type: Sequelize.DATE, 
        allowNull: false
    },
    durata: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

const Profesor = sequelize.define("profesor", {
    id:{
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true
    },
    nume: {
        type: Sequelize.STRING,
        allowNull: false
    },
    prenume: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

async function syncDB() {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
}

Curs.hasMany(Student, {foreignKey: 'idCurs'});
Student.belongsTo(Curs, {foreignKey: 'idCurs'});

Curs.hasMany(Feedback, {foreignKey: 'idCurs'});
Feedback.belongsTo(Curs, {foreignKey: 'idCurs'});

Profesor.hasMany(Curs, {foreignKey: 'idProfesor'});
Curs.belongsTo(Profesor, {foreignKey: 'idProfesor'});


export {Student, Feedback, Curs, Profesor, syncDB};