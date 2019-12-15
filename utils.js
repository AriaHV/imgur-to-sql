const Imgur = require('imgur'); 

const getImageURLs = async (album) => {
    const result = await Imgur.getAlbumInfo(album);
    return result.data.images.map(image => image.link);
}

const getEntrySQL = (command, images, description) => {
    return images.map(image => `INSERT INTO response_command_entries (command_name, embed_image, embed_description) VALUES ('${command}', '${image}', '${description}');`)
    .join('\n');
}

const getEntryUndoSQL = (command) => {
    return `DELETE FROM response_command_entries WHERE command_name = '${command}';`;
}

module.exports = { getImageURLs, getEntrySQL, getEntryUndoSQL };