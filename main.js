// load  libraries
const express = require('express')
const handlebars = require('express-handlebars')

// function to return a random number
const randomNum = () => 
    Math.floor(Math.random() * Math.floor(imageArray.length - 1))

// configure port
const PORT = parseInt(process.argv[2]) || parseInt(process.env.APP_PORT) || 3000

// create instance of express
const app = express()

// configure handlebars
app.engine('hbs', 
    handlebars({ defaultLayout: 'template.hbs'})
)
app.set('view engine', 'hbs')

// load resources
app.use(express.static(__dirname + '/public'))
app.use(express.static(__dirname + '/static'))

// declare array of images
const imageArray = [
    'dado-1.png', 
    'dice-showing-6.png', 
    'Five-Image.png', 
    'four.png', 
    'roll2.png', 
    'three_dots.png'
]


// Configure express

// Homepage
app.get('/',
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

// Dice changes every refresh
app.get('/roll',
    (req, resp) => {
        resp.status(200)
        resp.type('text/html')
        resp.render('roll',
                {
                    title : 'Rolled a dice.',
                    image1: `images/${imageArray[randomNum()]}`,
                    image2: `images/${imageArray[randomNum()]}`
                }
        )
    }
)

// redirects browser back to homepage
app.use(
    (res, resp) => {
        resp.redirect('/')
})

// start the server
app.listen(PORT, () => {
    console.info(`  Application started on PORT ${PORT} at ${new Date()}`)
})