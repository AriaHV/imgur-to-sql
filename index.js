const { getImageURLs, getEntrySQL, getEntryUndoSQL } = require('./utils.js');
const { migrations } = require('./migrations.json')
const Imgur = require('imgur');
const fs = require('fs');


const main = async () => {
    // const album = 'ckHPkMD';
    // const images = await getImageURLs(album);
    // const sql = getEntrySQL('admire', images, '');
    // console.log(sql);


    
    for (const migration of migrations) {
        const sDo = [];
        const sUndo = [];
        for (const album of migration.albums) {
            const images = await getImageURLs(album.hash);
            
            if (images) {
                const sql = getEntrySQL(album.command, images, album.description);
                sDo.push(sql);
            }

            sUndo.push(getEntryUndoSQL(album.command));
        }
        const doFile = [migration.id, 'do', migration.name, 'sql'].join('.');
        const undoFile = [migration.id, 'undo', migration.name, 'sql'].join('.');
        const doWrite = sDo.join('\n');
        const undoWrite = sUndo.join('\n');
        await fs.writeFile('./exports/' + doFile, doWrite, (err) => {if (err) throw err; });
        await fs.writeFile('./exports/' + undoFile, undoWrite, (err) => {if (err) throw err; });
    }
    
}

main();