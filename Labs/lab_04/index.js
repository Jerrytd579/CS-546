const movies = require('./data/movies');
const connection = require('./config/mongoConnection');

async function main(){
    console.log("#--------------------------------1 & 2--------------------------------#");
    // 1. Create a movie of your choice.
    const billAndTed = await movies.create("Bill and Ted Face the Music",
                                            "Once told they'd save the universe during a time-traveling adventure, 2 would-be rockers from San Dimas, California find themselves as middle-aged dads still trying to crank out a hit song and fulfill their destiny.",
                                            "PG-13", 
                                            "1hr 31min",
                                            "Comedy",
                                            ["Keanu Reeves","Alex Winter"],
                                            {director: "Dean Parisot", yearReleased: 2020});
    // 2. Log the newly created movie. (Just that movie, not all movies)
    console.log(billAndTed);

    console.log("#--------------------------------3 & 4--------------------------------#");
    // 3. Create another movie of your choice.
    const avengersEndgame = await movies.create("Avengers: Endgame",
                                                "Thanos, the Mad Titan, has set into motion events that are destroying the universe. The superheroes' ranks are fractured after 'Avengers: Infinity War' (2017). The remaining Avengers reassemble to undo the chaos left in Thanos' wake. As they call in allies and travel back and forth in time, they attempt to reverse the consequences of Thanos' devastation and restore order to the universe.",
                                                "PG-13",
                                                "3hr 1min",
                                                "Sci-Fi/Drama/Adventure/Action",                                        
                                                ["Robert Downey Jr.","Chris Evans","Mark Ruffalo", "Chris Hemsworth",
                                                    "Scarlett Johansson", "Jeremy Renner", "Don Cheadle", "Paul Rudd",
                                                    "Brie Larson", "Karen Gillan", "Danai Gurira", "Benedict Wong",
                                                    "Jon Favreau", "Bradley Cooper", "Gwyneth Paltrow", "Josh Brolin"
                                                ],
                                                {director: "The Russo Brothers", yearReleased: 2019});
    // 4. Query all movies, and log them all                                            
    let allMovies = await movies.getAll();
    console.log(allMovies);

    console.log("#--------------------------------5 & 6--------------------------------#");
    // 5. Create a 3rd movie of your choice.
    const avengersInfinityWar = await movies.create("Avengers: Infinity War",
                                                    "Thanos, the evil Mad Titan, is on a mission to collect all six Infinity Stones. His plan, once he acquires the stones, is to destroy half of all life in the universe. In this 'Avengers: Endgame' prequel, the Avengers and their superhero allies risk all in the ultimate fight for the fate of existence itself.",
                                                    "PG-13",
                                                    "2hr 36min",
                                                    "Sci-Fi/Adventure/Action",
                                                    ["Robert Downey Jr.","Chris Evans","Mark Ruffalo", "Chris Hemsworth",
                                                    "Scarlett Johansson", "Benedict Cumberbatch", "Don Cheadle", "Tom Holland",
                                                    "Chadwick Boseman", "Paul Bettany", "Elizabeth Olsen", "Anthony Mackie",
                                                    "Sebastian Stan", "Danai Gurira", "Letitia Wright", "Dave Bautista", 
                                                    "Zoe Saldana", "Josh Brolin", "Chris Pratt"
                                                    ],   
                                                    {director: "The Russo Brothers", yearReleased: 2018});
    // 6. Log the newly created 3rd movie. (Just that movie, not all movies)                     
    console.log(avengersInfinityWar);

    console.log("#--------------------------------7 & 8--------------------------------#");            
    // 7. Rename the first movie's title               
    const rename = await movies.rename(billAndTed._id, "Patrick and Ted Face the Music");
    // 8. Log the first movie with the updated title.
    console.log(rename);

    console.log("#--------------------------------9 & 10--------------------------------#");     
    // 9. Remove the second movie you created.
    const removeAvengersEndgame = await movies.remove(avengersEndgame._id);
    console.log(removeAvengersEndgame);
    //avengersEndgame = null;
    // 10. Query all movies, and log them all.
    allMovies = await movies.getAll();
    console.log(allMovies);

    console.log("#--------------------------------11--------------------------------#"); 
    // 11. Try to create a movie with bad input parameters to make sure it throws errors.
    try{
        const badMovie = await movies.create(
            "Some bad horror film",
            "This doesn't exist",
            "PG-13",
            "0",
            "Horror",
            [""],
            {director: "film school student", yearReleased: "idk"}
        )
        console.log(`Creating movie with bad input parameters did not fail: this should not happen: ` + badMovie)
    } catch(e){
        console.log(`Creating movie with bad input parameters failed successfully: ${e}`)
    }

    console.log("#--------------------------------12--------------------------------#"); 
    // 12. Try to remove a movie that does not exist to make sure it throws errors.
    try{
        const removeMovie = await movies.remove(avengersEndgame._id);
        console.log(`Removing a movie that does not exist did not fail: this should not happen: ` + removeMovie)
    } catch(e){
        console.log(`Removing a movie that does not exist failed successfully: ${e}`);
    }

    console.log("#--------------------------------13--------------------------------#"); 
    // 13. Try to rename a movie that does not exist to make sure it throws errors.
    try{
        const renameMovie = await movies.rename(avengersEndgame._id, "A Good Movie");
        console.log(`Renaming a movie that does not exist did not fail: this should not happen: ` + renameMovie)
    } catch(e){
        console.log(`Renaming a movie that does not exist failed successfully: ${e}`);
    }    

    console.log("#--------------------------------14--------------------------------#"); 
    // 14. Try to rename a movie passing in invalid data for the parameter to make sure it throws errors.
    try{
        const renameMovie1 = await movies.rename(avengersInfinityWar._id, 612);
        console.log(`Renaming a movie with bad parameters did not fail: this should not happen:` + renameMovie1)
    } catch(e){
        console.log(`Renaming a movie with bad parameters failed successfully: ${e}`);
    }    

    console.log("#--------------------------------15--------------------------------#"); 
    // 15. Try getting a movie by ID that does not exist to make sure it throws errors.
    try{
        const getMovieFail = await movies.get(avengersEndgame._id);
        console.log(`Getting a movie that does not exist did not fail: this should not happen: ` + getMovieFail);
    } catch(e){
        console.log(`Getting a movie that does not exist failed successfully: ${e}`);
    }

    // Grabbed db disconnection from app.js lecture notes
    const db = await connection();
    await db.serverConfig.close();

    console.log('Done!');
}

// Also grabbed this one off app.js lecture notes
main().catch((error) => {
    console.log(error);
  });