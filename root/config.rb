# Require any additional compass plugins here.
# require "breakpoint"

# Set this to the root of your project when deployed
http_path = ""
css_dir = "css"
sass_dir = "sass"
images_dir = "images"
javascripts_dir = "js"

# To enable relative paths to assets via compass helper functions. Uncomment:
relative_assets = true

# You can select your preferred output style here (can be overridden via the command line):
# :expanded or :nested or :compact or :compressed
if environment == :development
    output_style = :expanded
else
    output_style = :compressed
    line_comments = false
end

asset_cache_buster :none