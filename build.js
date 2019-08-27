var Metalsmith = require('metalsmith'),
    markdown = require('metalsmith-markdown'),
    templates = require('metalsmith-templates'),
    collections = require('metalsmith-collections'),
    permalinks = require('metalsmith-permalinks');
    discoverPartials = require('metalsmith-discover-partials')

Metalsmith(__dirname)
    .use(collections({
        pages: {
            pattern: 'content/pages/*.md'
        },
        articles: {
            pattern: 'content/articles/*.md',
            sortBy: 'date'
        }
    }))
    .use(markdown())
    .use(permalinks({
        pattern: ':collections/:title'
    }))
  .use(discoverPartials({
    directory: 'partials',
    pattern: /\.hbs$/
  }))
    .use(templates({
        engine: 'handlebars',
        partials: {
            header: 'partials/header',
            footer: 'partials/footer',
            menu: 'partials/menu'
        }
    }))
    .destination('./build')
    .build(function (err) { if(err) console.log(err) })
