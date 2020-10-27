// load  libraries
const express = require('express')
const handlebars = require('express-handlebars')

// configure port
const PORT = parseInt(process.argv[2]) || parseInt(process.env.APP_PORT) || 3000

// create instance of express
const app = express()

// configure handlebars
app.engine('hbs', 
    handlebars({ defaultLayout: 'template.hbs'})
)
app.set('view engine', 'hbs')

// configure the application
app.use(express.static(__dirname + '/public'));

// declare variable of images
let imageArray = ['dado-1.png', 'dice-showing-6.png', 'Five-Image.png', 'four.png', 'roll2.png', 'three_dots.png']

function randomNum()
{
    return Math.floor(Math.random() * Math.floor(imageArray.length - 1));
}

console.info(imageArray)

app.get('/roll',
    (req, resp) => {
        resp.status(200)
        resp.type('text/html')
        resp.render('roll',
                {
                    title : 'Rolled a dice.',
                    image1: `images/${imageArray[randomNum]}`,
                    image2: 'images/dado-1.png'
                }
        )
    }
)

// default page
app.use(
    (req, resp) => {
        resp.status(200)
        resp.type('text/html')
        resp.render('main',
                {
                    title: 'Awesome Dice Rolling Homepage'
                }
        )
    }
)

// start the server
app.listen(PORT, () => {
    console.info(`  Application started on PORT ${PORT} at ${new Date()}`)
})