# ![picimo](./picimo.png)

P I C T U R E S &nbsp; I N &nbsp; M O T I O N

picimo is a [creative coding](https://en.wikipedia.org/wiki/Creative_coding) project containing several javascript &or; typescript libraries &and; demos loosely based on realtime 2.5d graphics in html5 with webgl.

in the creation of picimo there were the following main objectives:

- I do wanna create realtime animated graphics in webgl and makes it easy to develop special effects in webdev or even gamedev in desktop and mobile browsers
- I want to create [sprites](https://en.wikipedia.org/wiki/Sprite_(computer_graphics))<sup>*</sup> with custom properties defined by me and my imagination and render them with my own custom webgl shaders
- it should be as simple as possible to display [pixel art](https://en.wikipedia.org/wiki/Pixel_art) graphics in a [responsive design aware environment](https://en.wikipedia.org/wiki/Responsive_web_design)
- the API should be as simple as possible and be fun to use!<sup>**</sup>

_<sup>*</sup> Why? .. as a child of the eighties i grew up with computers and console games that didn't have special 3d hardware. at that time most games consisted of 2d-sprites, 2d-levels with parallax effects and sprites that simulated a 3d environment (also known as 2.5d) - already at that time I wanted to be able to program something like that, but somehow I was kept from .._<sup>***</sup>

_<sup>**</sup> the most important aspect of all :wink:_

_<sup>***</sup> I am glad you ask for: you can [hire me as a freelance front-end developer](https://www.spearwolf.de) &mdash; I am always happy to receive exciting project requests!_

so picimo was started as a part time in my spare time &mdash; during the evolutionary development phases the following experiences and insights were gained:

- when developing your own webgl based rendering engine you can learn a lot of things but in the long run it is quite costly &mdash; so, why trying to reinvet the wheel? it is for this reason picimo relies on the fantastic [three.js](https://threejs.org/) as webgl renderer
  
  picimo does not even try to hide the three.js api, but sees itself as an additional library which has that one feature, a complicated thing intentionally made simple!<up>*</sup>
  
- the development of visual and interactive applications using imperative programming is annoying &mdash; this is nothing new and is probably also responsible for the success of [react](https://reactjs.org/) (or similar frameworks). after early first experiments with a json based scene description or a web component based approach (how it does [a-frame](https://aframe.io/)), picimo now uses the declarative, component based approach of the young and incredibly exciting project [react-three-fiber](https://github.com/react-spring/react-three-fiber)

<sup>*</sup> _right, you guessed it: sprite rendering and all the things that go with it ..._

this is the main github repository for the picimo project and all of its related sub-projects.

the repository is organized into sub-directories containing the various projects. Check out the README.md files for specific projects to get more details:

| sub-directory | what's inside? |
|-----------|-------------|
| [`picimo`](packages/picimo/) | the main library |
| [`picimo-r3f`](packages/picimo-r3f/) | react components based on react-three-fiber |
| [`kitchen-sink`](packages/kitchen-sink/) | a [SPA](https://en.wikipedia.org/wiki/Single-page_application) with examples for almost all features of the picimo library |

## Development

When developing across all the projects in this repository, first install [git](https://git-scm.com/), [node.js](https://nodejs.org/) and [yarn](https://classic.yarnpkg.com/lang/en/).

Then, perform the following steps to get set up for development:

```sh
git clone git@github.com:spearwolf/picimo.git
cd picimo
yarn
yarn build
```

You should now be ready to work on any of the picimo projects :rocket:
