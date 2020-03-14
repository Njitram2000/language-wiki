'use strict';

class Wiki extends React.Component {
  initialWikiState = {
    loading: true, 
    filteredData: [],
    showVirtualKeyboard: false,
    focussedInput: null,
    selectedIndex: -1,
    editMode: false
  };

  data = [];

  constructor(props) {
    super(props);
    this.state = this.initialWikiState;
    $.getJSON({url: '/wiki', success: (data) => {
      this.data = data;
      this.setState((state, props) => ({loading: false, filteredData: data}));
    }});
  }

  onFocus = (event) => {
    var focussedInput = event.target.getAttribute('data-name');
    this.setState((state, props) => ({focussedInput}), () => {
      if (this.state.showVirtualKeyboard) {
        resetHangulBindings();
        hangulKeyboard();
      }
    });
  }

  toggleVirtualKeyboard = (event) => {
    this.setState((state, props) => ({showVirtualKeyboard: !state.showVirtualKeyboard}), () => {
      if (!this.state.showVirtualKeyboard) {
        resetHangulBindings();
      }
    });
  }

  clearSearch = () => {
    $('[data-name=search]').val('');
  }

  render() {
    if (this.state.loading) {
      return 'loading...';
    } else {
      var selectedEntry = this.state.selectedIndex >= 0 ? this.state.filteredData[this.state.selectedIndex] : null;
      return  <div id="grid">
                <div id='previews'>
                  {this.state.filteredData.map((entry, index) => {
                    var previewClass = 'preview';
                    if (this.state.selectedIndex === index) {
                      previewClass += ' selected';
                    }
                    return  <div className={previewClass} key={index}
                                onClick={() => {
                                  this.setState((state, props) => ({selectedIndex: index}))
                                }}>
                              <div className='title'>{entry.title}</div>
                              <div className='tags'>{entry.tags.map((tag) => `#${tag} `)}</div>
                              <div>{entry.source}</div>
                            </div>;
                    })
                  }
                </div>
                <div id="right-grid">
                  <div id='search'>
                    <InputField type='text' name='search'
                                showVirtualKeyboard={this.state.showVirtualKeyboard}
                                focussedInput={this.state.focussedInput}
                                onFocus={this.onFocus}
                                onKeyUp={() => {}}
                                />
                    <span onClick={this.clearSearch}><i className="clearSearch far fa-times-circle"></i></span>
                    <img className={this.state.showVirtualKeyboard ? 'korea active' : 'korea' } src="korea.png" onClick={this.toggleVirtualKeyboard} />
                    <HangulKeyboard show={this.state.showVirtualKeyboard && this.state.focussedInput !== null} />
                  </div>
                  {
                    this.state.editMode
                    ? <div id='editor'>

                      </div>
                    : <div id='view'>
                        {
                          selectedEntry
                          ? <div>
                              <div className='title'>{selectedEntry.title}</div>
                              <div className='tags'>{selectedEntry.tags.map((tag) => `#${tag} `)}</div>
                              <div>{selectedEntry.source}</div>
                              <div>{selectedEntry.details}</div>
                              <div className='examples'>
                                {selectedEntry.examples.map((example) => Object.keys(example).map((lang =>
                                  <div key={lang}>{example[lang]}</div>
                                )))}
                              </div>
                            </div>
                          : undefined
                        }
                      </div>
                  }
                </div>
              </div>;
    }
  }
}

class InputField extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <input type={this.props.type}
                  data-name={this.props.name}
                  id={this.props.showVirtualKeyboard && this.props.focussedInput === this.props.name ? 'hangul-input': undefined}
                  onFocus={this.props.onFocus} onKeyUp={this.props.onKeyUp} />
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
