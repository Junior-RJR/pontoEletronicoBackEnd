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
        console.log(user,"userrrr")
        console.log(request.body.data,"requesteee")
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
        const {nome, tipoPonto, horario} = request.body.data
        const registro = await prisma.registro.create({
            data: {
                name: nome,
                typePoint: tipoPonto,
                time: horario? horario: new Date(),
            }
        })
        console.log(registro,"userRegistro")
        console.log(request.body.data,"requestRegistro")
        return replay.send()
    }
)


app.listen({port:3333}).then( () =>
    console.log("Rodandoooo")
    )


