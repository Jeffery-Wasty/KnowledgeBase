const searchModel = require('../models/searchModel')

exports.searchWithTopic = async (req, res) => {
    console.log(req.body.topic)
    const topics_searched = await searchModel.searchWithTopic(req.body.topic);
    res.render('searchResultsView', {discussions: topics_searched[0][0], discCSS:true, header: true});
}

exports.searchWithString = async (req, res) => {
    const string_searched = await searchModel.searchWithString(req.query.search);
    res.render('searchResultsView', {discussions: string_searched[0][0], discCSS: true, header: true});
}
