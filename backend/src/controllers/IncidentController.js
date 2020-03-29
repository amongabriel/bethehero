const connection = require('../connection');

module.exports = {
    async index(request, response) {
        const { page = 1 , perpage = 5 } = request.query;

        const ongs = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
            .limit(perpage)
            .offset((page -1) * perpage)
            .select(['incidents.*'
                    ,'ongs.name'
                    , 'ongs.email'
                    , 'ongs.whatsapp'
                    , 'ongs.city'
                    , 'ongs.uf']);
        
        const [count] = await connection('incidents').count();
        response.header('X-Total-Count', count['count(*)']);
        response.header('X-Total-Pages', Math.ceil(count['count(*)']/perpage));
        return response.json(ongs);
    },

    async indexByOng(request, response) {
        const ong_id = request.headers.authorization;
        const incidents = await connection('incidents')
            .where('ong_id', ong_id)
            .select('*');
    
        return response.json(incidents);
    },

    async create(request, response) {
        const { title, description, value} = request.body;
        const ong_id = request.headers.authorization;

        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id
        });

        return response.json({ id});

    },

    async delete(request, response) {
        const { id } = request.params;
        const ong_id = request.headers.authorization;

        const incident = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first();

        if(incident.ong_id != ong_id){
            return response.status(401).json({ error: "Operatino not permitted."});
        }
        await connection('incidents').where('id',id).delete();

        return response.status(204).send();

    }
};