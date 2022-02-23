# Developer Log

This document is kept by developers to provide contextual information and background to design decisions and for keeping a rough project diary.


### 2022-02-22

- Hello NestJS! This is my first time with NestJS, therefore I opt to follow [the steps at it's official documentation.](https://docs.nestjs.com/first-steps)


- Okay - *checks the list* - we need a Swagger documentation page to view and test our API endpoints. In any project with minimum sanity requirements, the documentation page must be auto-generated from the source code, so it can be marked as one less thing to do, and will always stay up-to-date.


- Seems like there's a [Swagger package provided by the NestJS maintainers.](https://www.npmjs.com/package/@nestjs/swagger) Neat! That concludes my search. I feel comfy moving forward with that for the time being. 


- After a short while, it's evident that we need some form of hot-replacement while working with nest CLI provided development server. Otherwise, changes really take forever to reflect. After jumping around google and the documentation a bit, I've set-up HMR following [the docs.](https://docs.nestjs.com/recipes/hot-reload)
