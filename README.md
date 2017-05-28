# audreymgr.github.io

The portfolio of Audrey Magré.

## Requirements

Make sure that Ruby (>= 2.0.0) is installed on your development machine.

`ruby -v`

You also need to have Bundler installed. Check it with:

`bundle -v`

If Bundler is not installed, type the following:

`gem install bundler`

It might be useful to updated Gem:

`sudo gem update --system`

If you don't have XCode installed, go ahead and download it.

## Local setup

Clone this repository in your `/Users/you/Sites` directory.

You can do it either with [Github Desktop](https://desktop.github.com), or using the command line:

`git clone git@github.com:audreymgr/audreymgr.github.io.git`

Go to the newly cloned repository:

`cd ~/Sites/audreymgr.github.io`

Install the project dependencies using:

`bundle install`

## Running the website on your computer

Open your terminal and go to your Sites directory:

`cd ~/Sites/audreymgr.github.io`

Launch Jekyll:

`bundle exec jekyll serve`

That's it! You can now preview the website at http://localhost:4000.