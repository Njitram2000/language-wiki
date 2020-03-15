'use strict';

class Wiki extends React.Component {
  initialWikiState = {
    loading: true, 
    searchResults: [],
    showVirtualKeyboard: false,
    focussedInput: null,
    // negative number indicates a new entry
    selectedIndex: -1,
    editMode: true
  };

  data = {};
  searchData = [];

  constructor(props) {
    super(props);
    this.state = this.initialWikiState;
    this.loadData();
  }

  loadData = () => {
    $.getJSON({url: '/wiki', success: (data) => {
      this.data = data;
      this.createSearchData();
      this.setState({loading: false, filteredData: data});
    }});
  }

  createSearchData = () => {
    this.searchData = [];
    Object.keys(this.data).map((id) => {
      var entry = this.data[id];
      entry.id = id;
      this.searchData.push(entry);
    });
    // Reset searchResults to contain everything
    this.setState({searchResults: this.searchData});
  }

  search(searchterm) {
    // TODO: actually search
    if(searchterm && searchterm.length > 0) {
      this.setState({searchResults: this.searchData});
    } else {
      // Reset searchResults to contain everything
      this.setState({searchResults: this.searchData});
    }
  }

  clearSearch = () => {
    $('[data-name=search]').val('');
  }

  setFocussedInput = (focussedInput) => {
    resetHangulBindings();
    this.setState((state, props) => ({focussedInput}), () => {
      if (this.state.showVirtualKeyboard) {
        hangulKeyboard();
      }
    });
  }
  
  toggleVirtualKeyboard = (event) => {
    resetHangulBindings();
    this.setState((state, props) => ({showVirtualKeyboard: !state.showVirtualKeyboard}), () => {
      if (this.state.showVirtualKeyboard && this.state.focussedInput) {
        hangulKeyboard();
      }
    });
  }

  selectEntry = (index) => {
    this.setState({selectedIndex: index, editMode: false});
  }

  updateEntry(updatedEntry) {
    var newData = [];
    var foundEntry = false;
    this.data.map(entry => {
      if (entry.id === updatedEntry) {
        newData.push(updatedEntry);
        foundEntry = true;
      } else {
        newData.push(entry);
      }
    });
    // If it did not exist yet, it's a new entry
    if (!foundEntry) {
      newData.push(updatedEntry);
    }
    // write to file

    this.data = newData;

  }

  deleteEntry(id) {
    var newData = [];
    this.data.map(entry => {
      if (entry.id !== id) {
        newData.push(entry)
      }
    });
    writeDataFile(newData);
  }

  writeDataFile(newData) {
    $.post( "/wiki", newData);
  }

  render() {
    if (this.state.loading) {
      return 'loading...';
    } else {
      var selectedEntry = this.state.selectedIndex >= 0
        ? this.state.searchResults[this.state.selectedIndex]
        : {
            id: Date.now(),
            title: '',
            tags: '',
            source: '',
            details: '',
            examples: ''
          };
      var virtualKeyboard = {
        show: this.state.showVirtualKeyboard,
        focussedInput: this.state.focussedInput,
        setFocussedInput: this.setFocussedInput
      }
      return  <div id="grid">
                <div id='previews'>
                  {this.state.searchResults.map((entry, index) => {
                    return <Preview entry={entry} key={index}
                                    isSelected={this.state.selectedIndex === index} 
                                    onClick={() => this.selectEntry(index)} />
                  })}
                </div>
                <div id="right-grid">
                  <div id='search'>
                    <InputField type='text' name='search'
                                virtualKeyboard={virtualKeyboard}
                                />
                    <span onClick={this.clearSearch}><i className="clearSearch far fa-times-circle"></i></span>
                    <img className={this.state.showVirtualKeyboard ? 'korea active' : 'korea' } src="korea.png" onClick={this.toggleVirtualKeyboard} />
                    <i className='new far fa-plus-square' onClick={(e) => { e.preventDefault(); this.setState((state) => ({editMode: !state.editMode})) }}></i>
                    <i className='edit fas fa-pencil-alt' onClick={(e) => { e.preventDefault(); this.setState((state) => ({editMode: !state.editMode})) }}></i>
                  </div>
                  <View id='view' entry={selectedEntry} editMode={this.state.editMode} virtualKeyboard={virtualKeyboard} updateEntry={this.updateEntry} deleteEntry={this.deleteEntry} />
                  <HangulKeyboard show={this.state.showVirtualKeyboard && this.state.focussedInput !== null} />
                </div>
              </div>;
    }
  }
}

class Preview extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var previewClass = 'preview';
    if (this.props.isSelected) {
      previewClass += ' selected';
    }
    return  <div className={previewClass}
                onClick={this.props.onClick}>
              <div className='title'>{this.props.entry.title}</div>
              <div className='tags'>{this.props.entry.tags.map((tag) => `#${tag} `)}</div>
              <div>{this.props.entry.source}</div>
            </div>;
  }
}

class View extends React.Component {
  constructor(props) {
    super(props);
  }

  deleteEntry() {
    this.props.deleteEntry(this.props.entry.id);
  }

  updateEntry() {
    var entry = {
      // Using the current timestamp ensures a unique id for new entries
      id: this.props.entry.id >= 0 ? this.props.entry.id : Date.now(),
      title: $('[data-name=title]').val(),
      tags: $('[data-name=tags]').val().split('\n'),
      source: $('[data-name=source]').val(),
      details: $('[data-name=details]').val(),
      examples: $('[data-nameexamples]').val()
    };
    this.props.updateEntry(entry);
  }

  render() {
    return  <form id={this.props.id}>
              <fieldset>
                <legend>Title</legend>
                {
                  this.props.editMode
                  ? <InputField type='text' name='title' value={this.props.entry.title}
                                virtualKeyboard={this.props.virtualKeyboard}
                                />
                  : this.props.entry.title
                }
              </fieldset>
              <fieldset>
                <legend>Tags</legend>
                {
                  this.props.editMode
                  ? <TextArea name='tags' value={this.props.entry.tags ? this.props.entry.tags.join('\n') : undefined}
                              virtualKeyboard={this.props.virtualKeyboard}
                                />
                  : this.props.entry.tags ? this.props.entry.tags.map((tag) => `#${tag} `) : undefined
                }
              </fieldset>
              <fieldset>
                <legend>Source</legend>
                {
                  this.props.editMode
                  ? <InputField type='text' name='source' value={this.props.entry.source}
                                virtualKeyboard={this.props.virtualKeyboard}
                                />
                  : this.props.entry.source
                }
              </fieldset>
              <fieldset>
                <legend>Details</legend>
                {
                  this.props.editMode
                  ? <TextArea name='details' value={this.props.entry.details}
                              virtualKeyboard={this.props.virtualKeyboard}
                                />
                  : this.props.entry.details
                }
              </fieldset>
              <fieldset>
                <legend>Examples</legend>
                {
                  this.props.editMode
                  ? <TextArea name='examples' value={this.props.entry.examples}
                              virtualKeyboard={this.props.virtualKeyboard}
                                />
                  : this.props.entry.examples ? this.props.entry.examples.split('\n').map((line, index) => <div key={index}>{line}&nbsp;</div>) : undefined
                }
              </fieldset>
              {
                this.props.editMode
                ? <span><i className='save far fa-save' onClick={(e) => { e.preventDefault(); this.setState((state) => ({editMode: !state.editMode})) }}></i></span>
                : undefined
              }
            </form>;
  }
}

class InputField extends React.Component {
  constructor(props) {
    super(props);
  }

  onFocus = (event) => {
    var focussedInput = event.target.getAttribute('data-name');
    this.props.virtualKeyboard.setFocussedInput(focussedInput);
  }

  render() {
    return <input type={this.props.type}
                  defaultValue={this.props.value}
                  data-name={this.props.name}
                  id={this.props.virtualKeyboard.show && this.props.virtualKeyboard.focussedInput === this.props.name ? 'hangul-input': undefined}
                  onFocus={this.onFocus} />
  }
}

class TextArea extends InputField {
  render() {
    return <textarea defaultValue={this.props.value}
                     data-name={this.props.name}
                     rows='3'
                     id={this.props.virtualKeyboard.show && this.props.virtualKeyboard.focussedInput === this.props.name ? 'hangul-input': undefined}
                     onFocus={this.onFocus} />
  }
}

class HangulKeyboard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div id='keyboard'></div>;
  }
}
