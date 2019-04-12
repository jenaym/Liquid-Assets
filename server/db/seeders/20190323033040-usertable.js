'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert("UserTable", [
            {
                name: "tiffanywang",
                email: "tiffany.wang@gmail.com",
                password: "L1@wbst",
            },
            {
                name: "josemendoza",
                email: "jose.mendoza@yahoo.com",
                password: "t1ju4n@",
            },
            {
                name: "kenjikaneko",
                email: "kenji.kaneko@outlook.com",
                password: "k4n3k0415",
            },
            {
                name: "anushreechopra",
                email: "anushree.chopra@yahoo.com",
                password: "19ac96!!",
            },
            {
                name: "erinstark",
                email: "erin.stark@gmail.com",
                password: "j0n15m1n3",
            },
            {
                name: "andreidimov",
                email: "andrei.dimov@gmail.com",
                password: "r3dp3nd@",
            },
            {
                name: "audreyan",
                email: "audrey.an@gmail.com",
                password: "06dr3y1995",
            },
            {
                name: "mattrice",
                email: "matt.rice@outlook.com",
                password: "Z1pL1n1ng!!",
            },
            {
                name: "juliaosadzinski",
                email: "julia.osadzinski@outlook.com",
                password: "0mgSO4wsum",
            },
            {
                name: "drewkane",
                email: "drew.kane@yahoo.com",
                password: "z1lch2S@Y",
            }
        ], {});
    },

    down: (queryInterface) => {
        return queryInterface.bulkDelete("UserTable", null, {});
    }
};
