import { SiteClient } from 'datocms-client'

export default async function requestReceiver(req, res) {
    if (req.method === 'POST') {
        const TOKEN = '6be28861798f7b2e52dca9e076ea2e'
        const client = new SiteClient(TOKEN)

        const createdRecord = await client.items.create({
            itemType: "975680",
            ...req.body,
        })

        res.json({
            datas: 'Some Data',
            createdRecord: createdRecord
        })
        return
    }

    res.status(404).json({
        message: 'Ainda não temos nada no GET, porém no POST tem!'
    })
}