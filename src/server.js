import fastify from 'fastify';
import cors from '@fastify/cors';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = fastify();

app.register(cors, {origin: '*'})

app.get('/',(request, replay)=>
    {
        replay.send('Raixxxx')
    }
)

app.post('/login',async(request, replay)=>
    {
        const user = await prisma.user.findFirst({
            where: {
                name: request.body.data.name,
            }
        })
        if (
            user.key !== request.body.data.key
        ){
            return replay.statusCode(401).send('Credenciais Inválidas')
        }
        return replay.send()
    }
)

app.post('/registro',async(request, replay)=>
    {
        function pad(value) {
            return value.toString().padStart(2, 0);
        }
        const {nome, tipoPonto, horario} = request.body.data
        const date = horario ? horario : new Date()
        const dataBrasil = new Date(`${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours()-3)}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`)
        await prisma.registro.create({
            data: {
                name: nome,
                typePoint: tipoPonto,
                time: dataBrasil,
            }
        })
        return replay.send()
    }
)

app.get('/relatorio',async(request, replay)=>
    {
        const listaPontos = await prisma.registro.findMany({})
        return replay.status(200).send(listaPontos)
    }
)


app.listen({port:3333}).then( () =>
    console.log("Rodandoooo")
    )


