# Givebutter Frontend Take-home

## Overview

Our goal is to fix and enhance a Pokedex application. If you are unfamiliar with the world of Pokemon, here is a brief explanation:

> The Pokedex is an electronic device created and designed to catalog and provide information regarding the various species of Pokemon featured in the Pokemon video game, anime and manga series.
 
[Source](https://pokemon.fandom.com/wiki/Pokedex)
 
Our version of the Pokedex is able to list and search through Pokemon. However, our search is a bit buggy. Additionally, we want to add a feature that shows a selected Pokemon's details like its **type**, **moves**, and **evolution chain**.

Your time is valuable, and we are extremely appreciative of you participating in this assessment. We're looking to gauge your ability to read and edit code, understand instructions, and deliver features, just as you would during your typical day-to-day work. We expect this test to take no more than one to two hours and ask to complete this work within the next two days. Upon submit, we will review and provide feedback to you regardless of our decision to continue the process.

Please update and add code in `App.js` and `index.css` based on the requirements found below. Additionally, we ask you to edit the `readme.md` with answers to a few questions found in the `Follow-up Questions` section also found below.

When you are finished, please upload your completed work to your Github and invite `@gperl27` to view it. **Do not open a PR please.**

## Setup

- This repo was scaffolded using `create-react-app`. As such, this app requires a stable version of `node` to get up and running.
- Clone this repo and run `npm install`.
- To run the app, run `npm start`.
- Please reach out to the Givebutter team if you have any issues with the initial setup or have any problems when running the initial app.

## Requirements

### Search
- Typing in the search input should filter the existing Pokemon list and render only matches found
- Fix any bugs that prevent the search functionality from working correctly
- If there are no results from search, render "No Results Found"
- The search results container should be scrollable
- The UI should match the below mockup

![](mockup0.png)

### Details Card
     
- Clicking "Get Details" for any given Pokemon should render a card that has the Pokemon's `name`, `types`, `moves`, and `evolution chain`
- Use the api functions defined in `api.js` to retrieve this data. Adding new endpoints or editing existing ones are out of scope
- The details card should match the below mockup

![](mockup1.png)

## Follow-up Questions

Please take some time to answer the following questions. Your answers should go directly in this `readme`.

- Given more time, what would you suggest for improving the performance of this app?

Improvements could be made in the handling of data. 

I am pulling down a lot of data that I do not need. Some client-side logic got complicated, such as recursively traversing the evolutions to flatten the data structure. There also isn't any caching. From what I understand, this data would stay the same, so it would be better if we used some client caching mechanism to prevent us from making multiple API requests for the same data.

We should also debounce/throttle our search input.

- Is there anything you would consider doing if we were to go live with this app?

There's cleanup I would do to the code. I would do a design review, ask questions and then go back and clean up my CSS. There also wasn't a real effort made to make this responsive. I describe a requirements question below that I had while programming it. I would need to get clarification on any details such as that. I would make the performance improvements I mentioned, at least debouncing the input.

- What was the most challenging aspect of this work for you (if at all)?

I had a difficult time figuring out how to display the moves. For bulbasuar there were around 80 moves, but the mockups only showed 4. I ended up limiting my results to the first 4 moves, but I was wondering if there was more appropriate logic to use based on the game's rules. For example, could my character be at some evolution stage that makes only certain moves valid? I tried to find this logic by looking at the data, but in the end, I didn't find anything that made sense to me.

I also struggled with the formatting of the details section. I was surprised that the Types heading was left-aligned, but the Moves heading was center-aligned.