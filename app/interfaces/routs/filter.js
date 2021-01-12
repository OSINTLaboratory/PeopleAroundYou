const Core = require("../../core");

async function Filter(req, res){
  const query = req.db.sql();
  query.select(['filmid', 'title', 'year', 'rating', 'views', 'poster', 'genre'])
    .inTable('films');

  if(req.body.sort === 'RATING'){
    query.order('rating DESC');
  }else if(req.body.sort === 'ALP_ASC'){
    query.order('title ASC');
  }else if(req.body.sort === 'ALP_DESC'){
    query.order('title DESC');
  }else if(req.body.sort === 'YEAR_DESC'){
    query.order('year DESC');
  }else if(req.body.sort === 'YEAR_ASC'){
    query.order('year ASC');
  }else if(req.body.sort === 'VIEWS'){
    query.order('views ASC');
  }
  if(req.body.year_to !== ''){
    query.where({year:`<${req.body.year_to}`});
  }
  if(req.body.year_from !== ''){
    query.where({year:`>${req.body.year_from}`});
  }
  if(req.body.genre !== ''){
    query.where({genre:parseInt(req.body.genre)});
  }
  await query.exec((err, result) => {
    if(err){
      Core.log.warning(err);
      res.status(500).end();
      return;
    }
    res.send(JSON.stringify(result)).end();
  })
}

module.exports = Filter;