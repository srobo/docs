require 'fileutils'
require 'set'
require 'yaml'

task :clean do
  sh('rm -rf _site')
end

task :deep_clean => [:clean] do
  sh('rm -rf gems')
end

task :dependencies do
  if ! ENV["GLOBAL_GEMS"]
    sh('bundle config set --local path "gems"')
  end
  sh('bundle install')

  # Fix pathutil on Ruby 3; works around https://github.com/envygeeks/pathutil/pull/5
  # as suggested by https://stackoverflow.com/a/73909894/67873
  pathutil_path = `bundle exec gem which pathutil`.strip()
  content = File.read(pathutil_path).gsub(', kwd', ', **kwd')
  File.write(pathutil_path, content)
end

task :spelling_dependencies do
  sh('npm install')
end

file '_sass/brand/.git' do
  sh('git submodule update --init')
end

task :submodules => ['_sass/brand/.git']

task :dev => [:dependencies, :submodules] do
  sh('bundle exec jekyll serve --host 0.0.0.0 --drafts --config _config.yml,_dev.yml')
end

task :build => [:dependencies, :submodules] do
  sh('bundle exec jekyll build --config _config.yml')
end

task :build_spellings => [:build, :spelling_dependencies]

task :validate_kit_versions do
  data = YAML.load_file('_data/kit_versions.yml')
  data.each do |entry|
    actual = entry.keys.to_set
    expected = ['version', 'released', 'link', 'changelog'].to_set
    optional = ['yanked'].to_set
    missing = expected - actual - optional
    extra = actual - expected - optional
    messages = []
    messages << "Missing keys: #{missing.to_a.join(', ')}" if missing.size() > 0
    messages << "Extra keys: #{extra.to_a.join(', ')}" if extra.size() > 0
    raise "For entry\n#{entry}\n#{messages.join("\n")}\n\n" if messages.size() > 0
  end

  puts "Kit versions validated successfully"
end

task :validate_interactive_troubleshooter_questions => [:build] do
  # Check that each of the next_question ids actually exists and that each
  # question is actually used.

  ROOT_QUESTION_ID = ''
  data = YAML.load_file('resources/troubleshooter/data.json')
  questions = data['questions']

  targets = Set.new
  questions.each_value do |question|
    question['answers'].each do |answer|
      if answer.has_key?('next_question')
        targets.add(answer['next_question'])
      end
    end
  end

  question_ids = questions.keys.to_set

  missing = targets - question_ids
  if missing.any?
    raise "Found 'next_question' targets which do not exist: #{missing.to_a.sort.join(', ')}"
  end

  extra = question_ids - targets - Set[ROOT_QUESTION_ID]
  if extra.any?
    puts "Warning: found unreachable questions: #{extra.to_a.sort.join(', ')}"
  end

  puts "Interactive Troubleshooter links validated successfully"
end

task :validate_interactive_troubleshooter_urls => [:build] do
  # There are lots of things which this could validate, however we assume that
  # most changes will be eyeballed by a human. We therefore just check the most
  # nuanced case -- that the url must be an exact match for its target page.

  def check_url(url)
    if url.end_with?("/")
      return if File.directory?("_site#{url}")
      raise "Invalid target url '#{url}' in interactive troubleshoter (did you mean '#{url[..-2]}'?)\n\n"
    else
      return if File.file?("_site#{url}.html")
      raise "Invalid target url '#{url}' in interactive troubleshoter (did you mean '#{url}/'?)\n\n"
    end
  end

  text = IO.read('resources/troubleshooter/data.json')
  text.scan(/href=\\"([^"]+)\\"/) do |match|
    url = match[0]
    if url.include? 'ROOT_URL'
      check_url(url.sub('ROOT_URL', '').sub(/#.+/, ''))
    end
  end

  puts "Interactive Troubleshooter urls validated successfully"
end

task :validate_links => [:build] do
  # Explanation of arguments:
  # --disable-external    # For speed. Ideally we'd check external links too, but ignoring for now.
  # --ignore-missing-alt  # To avoid needing to fix lots upfront, we can migrate towards this later.
  # --allow-hash-href     # Allow empty `#` links to mean "top of page". It's true that these can be errors, however we have far too many to really address this.
  # --allow-missing-href  # Allow missing hrefs as we use them in the troubleshooter and rules (as anchors). It's true that these can be errors, however we have plenty which are legitimate.
  # --swap-urls           # Adjust for Jekyll's baseurl. See https://github.com/gjtorikian/html-proofer/issues/618 for more.
  sh('bundle exec htmlproofer _site --disable-external true --ignore-missing-alt true --allow-hash-href true --allow-missing-href true --swap-urls "^/docs/:/"')
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

task :validate => [
  :validate_kit_versions,
  :validate_interactive_troubleshooter_questions,
  :validate_interactive_troubleshooter_urls,
  :validate_links,
  :validate_sidebar_tree,
  :validate_spellings,
]
