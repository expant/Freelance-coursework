exports.tasks = (req, res) => {
    let title = 'Сверстать страницу';
    let text = 'lorem sudo et setera.'
    let price = 50;

    res.render('market', {
        title: title,
        text: text,
        price: price
    });
};