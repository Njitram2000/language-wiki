'use strict';

class Wiki extends React.Component {
  initialWikiState = {
    loading: true, 
    searchResults: [],
    showVirtualKeyboard: false,
    focussedInput: null,
    // negative number indicates a new entry
    selectedId: -1,
    editMode: true
  };

  /*
   * Not kept in the state because these are intermediary variables from which searchResults in the state is calculated
   * The state triggers a re-render and the rendered html us based on the searchResults, not the searchTerm or searchData
   */
  searchTerm = '';
  searchData = [];

  constructor(props) {
    super(props);
    this.state = this.initialWikiState;
    this.loadData();
  }

  loadData = () => {
    $.getJSON({url: '/wiki', success: (data) => {
      this.setSearchData(data);
      this.setState({loading: false});
    }, error: () => {
      this.setSearchData([]);
    }});
  }

  /**
   * When the searchData changes, recalculate the searchResults in the state based on searchData and searchTerm
   * Because searchResults is in the state, it's change will trigger a re-render
   */
  setSearchData = (searchData) => {
    this.searchData = searchData;
    this.search();
  }

  search = () => {
    /*
     * Search using the searchTerm
     */
    if (this.searchTerm && this.searchTerm.length > 0) {
      var fuseOptions = {
        shouldSort: true,
        threshold: 0.4,
        location: 0,
        distance: 1000,
        minMatchCharLength: 1,
        keys: [{
            name: "title",
            weight: 0.3
          },{
            name: "tags",
            weight: 0.2
          }, {
            name: "source",
            weight: 0.1
          }, {
            name: "details",
            weight: 0.1
          }, {
            name: "examples",
            weight: 0.2
          }
        ]
      };
      var fuse = new Fuse(this.searchData, fuseOptions);
      const searchResults = fuse.search(this.searchTerm);
      var selectedId = this.state.selectedId;
      
      if (searchResults.length === 0) { // If no results, show new editor
        this.setState({searchResults, selectedId: -1, editMode: true});
      } else if (searchResults.find((entry) => entry.id === selectedId) === undefined) { // If the currently selected entry is no longer available, use first search result
        this.setState({searchResults, selectedId: searchResults[0].id, editMode: false});
      } else {
        this.setState({searchResults});
      }
    } else {
      // If search field is empty, show everything
      this.setState({searchResults: this.searchData});
    }
  }

  onSearchTermChange = (searchTerm) => {
    this.searchTerm = searchTerm;
    this.search();
  }

  clearSearch = () => {
    $('[data-name=search]').val('');
    this.onSearchTermChange('');
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

  selectEntry = (id) => {
    this.setState({selectedId: id, editMode: false});
  }

  updateEntry = (updatedEntry) => {
    var newData = [];
    var foundEntry = false;
    this.searchData.map(entry => {
      if (entry.id === updatedEntry.id) {
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
    this.writeDataFile(newData);
    this.setSearchData(newData);
    this.setState({selectedId: updatedEntry.id, editMode: false});
  }

  deleteEntry = (id) => {
    var newData = [];
    this.searchData.map(entry => {
      if (entry.id !== id) {
        newData.push(entry)
      }
    });
    this.writeDataFile(newData);
    this.setSearchData(newData);
    this.setState({selectedId: -1, editMode: true});
  }

  writeDataFile(newData) {
    $.post({
      url: "/wiki",
      data: JSON.stringify(newData),
      contentType: 'application/json'
    });
  }

  render() {
    if (this.state.loading) {
      return 'loading...';
    } else {
      var selectedEntry;
      if (this.state.selectedId >= 0) {
        selectedEntry = this.state.searchResults.find((entry) => entry.id === this.state.selectedId);
      } else {
        selectedEntry = {
          id: Date.now(),
          title: '',
          tags: '',
          source: '',
          details: '',
          examples: ''
        };
      }
      var virtualKeyboard = {
        show: this.state.showVirtualKeyboard,
        focussedInput: this.state.focussedInput,
        setFocussedInput: this.setFocussedInput
      }
      return  <div id="grid" onKeyUp={(e) => {if(e.ctrlKey && e.key === '<') { e.preventDefault(); this.toggleVirtualKeyboard()}}}>
                <div id='previews'>
                  {this.state.searchResults.map((entry) => {
                    return <Preview entry={entry} key={entry.id}
                                    isSelected={this.state.selectedId === entry.id} 
                                    onClick={() => this.selectEntry(entry.id)} />
                  })}
                </div>
                <div id="right-grid">
                  <div id='search'>
                    <SearchField type='text' name='search'
                                virtualKeyboard={virtualKeyboard}
                                onSearchTermChange={this.onSearchTermChange}/>
                    <span onClick={this.clearSearch}><i className="clearSearch far fa-times-circle"></i></span>
                    <img className={this.state.showVirtualKeyboard ? 'korea active' : 'korea' } src="korea.png" onClick={this.toggleVirtualKeyboard} />
                    <span onClick={(e) => {
                        e.preventDefault();
                        this.setState({editMode: true, selectedId: -1});
                        $('form#view')[0].reset();
                    }}>
                      <i className='new far fa-plus-square'></i>
                    </span>
                    {
                      this.state.selectedId >= 0
                      ? <span onClick={(e) => { e.preventDefault(); this.setState((state) => ({editMode: !state.editMode})) }}>
                          <i className='edit fas fa-pencil-alt'></i>
                        </span>
                      : undefined
                    }
                    {
                      this.state.selectedId >= 0
                      ? <span onClick={(e) => { e.preventDefault(); this.deleteEntry(this.state.selectedId);}}>
                          <i className='delete fas fa-trash-alt'></i>
                        </span>
                      : undefined
                    }
                  </div>
                  <View entry={selectedEntry} editMode={this.state.editMode} virtualKeyboard={virtualKeyboard} updateEntry={this.updateEntry} />
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
              <div className='tags'>{this.props.entry.tags.split('\n').map((tag) => `#${tag} `)}</div>
              <div>{this.props.entry.source}</div>
            </div>;
  }
}

class View extends React.Component {
  constructor(props) {
    super(props);
  }

  updateEntry() {
    if (this.props.editMode) {
      var entry = {
        // Using the current timestamp ensures a unique id for new entries
        id: this.props.entry.id >= 0 ? this.props.entry.id : Date.now(),
        title: $('[data-name=title]').val(),
        tags: $('[data-name=tags]').val(),
        source: $('[data-name=source]').val(),
        details: $('[data-name=details]').val(),
        examples: $('[data-name=examples]').val()
      };
      this.props.updateEntry(entry);
    }
  }

  render() {
    return  <form id='view'>
              <fieldset>
                <legend>Title</legend>
                {
                  this.props.editMode
                  ? <InputField type='text' name='title' value={this.props.entry.title}
                                virtualKeyboard={this.props.virtualKeyboard} />
                  : this.props.entry.title
                }
              </fieldset>
              <fieldset>
                <legend>Tags</legend>
                {
                  this.props.editMode
                  ? <TextArea name='tags' value={this.props.entry.tags} rows='3'
                              virtualKeyboard={this.props.virtualKeyboard} />
                  : this.props.entry.tags ? this.props.entry.tags.split('\n').map((tag) => `#${tag} `) : undefined
                }
              </fieldset>
              <fieldset>
                <legend>Source</legend>
                {
                  this.props.editMode
                  ? <InputField type='text' name='source' value={this.props.entry.source}
                                virtualKeyboard={this.props.virtualKeyboard} />
                  : this.props.entry.source
                }
              </fieldset>
              <fieldset>
                <legend>Details</legend>
                {
                  this.props.editMode
                  ? <TextArea name='details' value={this.props.entry.details} rows='7'
                              virtualKeyboard={this.props.virtualKeyboard} />
                  : this.props.entry.details ? this.props.entry.details.split('\n').map((line, index) => <div key={index}>{line}&nbsp;</div>) : undefined
                }
              </fieldset>
              <fieldset>
                <legend>Examples</legend>
                {
                  this.props.editMode
                  ? <TextArea name='examples' value={this.props.entry.examples} rows ='7'
                              virtualKeyboard={this.props.virtualKeyboard} />
                  : this.props.entry.examples ? this.props.entry.examples.split('\n').map((line, index) => <div key={index}>{line}&nbsp;</div>) : undefined
                }
              </fieldset>
              {
                this.props.editMode
                ? <span onClick={(e) => {
                    e.preventDefault();
                    this.updateEntry();
                  }}>
                    <i className='save far fa-save'></i></span>
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

class SearchField extends InputField {
  constructor(props) {
    super(props);
  }

  render() {
    return <input type={this.props.type}
                  defaultValue={this.props.value}
                  data-name={this.props.name}
                  id={this.props.virtualKeyboard.show && this.props.virtualKeyboard.focussedInput === this.props.name ? 'hangul-input': undefined}
                  onFocus={this.onFocus} onKeyUp={(e) => {this.props.onSearchTermChange(e.target.value)}}/>
  }
}

class TextArea extends InputField {
  render() {
    return <textarea defaultValue={this.props.value}
                     data-name={this.props.name}
                     rows={this.props.rows}
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
