require 'yaml'

task :clean do
  sh('rm -rf _site')
end

task :deep_clean => [:clean] do
  sh('rm -rf gems')
end

task :dependencies do
  sh('bundle install --path gems')
end

task :spelling_dependencies do
  sh('npm install')
end

file '_sass/brand/.git' do
  sh('git submodule update --init')
end

task :submodules => ['_sass/brand/.git']

task :dev => [:dependencies, :submodules] do
  sh('bundle exec jekyll serve --drafts --config _config.yml')
end

task :build => [:dependencies, :submodules] do
  sh('bundle exec jekyll build --config _config.yml')
end

task :build_spellings => [:build, :spelling_dependencies]

task :validate_kit_versions do
  data = YAML.load_file('_data/kit_versions.yml')
  data.each do |entry|
    actual = entry.keys.to_set
    expected = ['version', 'released'].to_set
    missing = expected - actual
    extra = actual - expected
    messages = []
    messages << "Missing keys: #{missing.to_a.join(', ')}" if missing.size() > 0
    messages << "Extra keys: #{extra.to_a.join(', ')}" if extra.size() > 0
    raise "For entry\n#{entry}\n#{messages.join("\n")}\n\n" if messages.size() > 0
  end

  puts "Kit versions validated successfully"
end

task :validate_links => [:build] do
  # Explanation of arguments:
  # --assume-extension  # Tells html-proofer that `.html` files can be accessed without the `.html` part in the url.
  # --disable-external  # For speed. Ideally we'd check external links too, but ignoring for now.
  # --empty-alt-ignore  # To avoid needing to fix lots upfront, we can migrate towards this later.
  # --allow-hash-href   # Allow empty `#` links to mean "top of page". It's true that these can be errors, however we have far too many to really address this.
  # --url-swap          # Adjust for Jekyll's baseurl. See https://github.com/gjtorikian/html-proofer/issues/618 for more.
  sh('bundle exec htmlproofer _site --assume-extension --disable-external --empty-alt-ignore --allow-hash-href --url-swap "^/docs/:/"')
end

task :validate_sidebar_tree => [:build] do
  # There are lots of things which this could validate, however we assume that
  # most changes will be eyeballed by a human. We therefore just check the most
  # nuanced case -- that the url must be an exact match for its target page.

  def check_url(url)
    if url.end_with?("/") then
      return if File.directory?("_site#{url}")
      raise "Imprecise target url '#{url}' in sidebar (did you mean '#{url[..-2]}'?)\n\n"
    else
      return if File.file?("_site#{url}.html")
      raise "Imprecise target url '#{url}' in sidebar (did you mean '#{url}/'?)\n\n"
    end
  end

  def check_nodes(node)
    check_url(node['url'])
    if node['tree'] then
      node['tree'].each do |x|
        check_nodes(x)
      end
    end
  end

  data = YAML.load_file('_data/sidebar_tree.yaml')
  data['tree'].each do |x|
    check_nodes(x)
  end

  puts "Sidebar links validated successfully"
end

task :validate_spellings => [:build_spellings] do
  sh('npm run spell-check')
end

task :validate => [:validate_kit_versions, :validate_links, :validate_sidebar_tree, :validate_spellings]
