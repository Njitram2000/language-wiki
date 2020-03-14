'use strict';

class Wiki extends React.Component {
  initialWikiState = {
    loading: true, 
    filteredData: [],
    showVirtualKeyboard: false,
    focussedInput: null
  };

  constructor(props) {
    super(props);
    this.state = this.initialWikiState;
    $.getJSON({url: '/wiki', success: (data) => {
      this.data = data;
      this.setState((state, props) => ({loading: false, filteredData: data}));
    }});
  }

  data = [];

  onKeyUp = (event) => {
    //
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
    })
  }

  render() {
    if (this.state.loading) {
      return 'loading...';
    } else {
      return  <div>
                <div className='search'>
                  <input type='text'
                         data-name='search'
                         id={this.state.showVirtualKeyboard && this.state.focussedInput === 'search' ? 'hangul-input': undefined}
                         onFocus={this.onFocus} onBlur={this.onBlur} onKeyUp={this.onKeyUp} />
                  <img className='korea' src="korea.png" onClick={this.toggleVirtualKeyboard} />
                </div>
                <div id='previews'>
                  {this.state.filteredData.map((entry, index) => {
                    return  <div key={index}>
                              <div className='title'>{entry.title}</div>
                              <div className='tags'>{entry.tags.map((tag) => `#${tag} `)}</div>
                              <div>{entry.source}</div>
                              <div>{entry.details}</div>
                              <div className='examples'>
                                {entry.examples.map((example) => Object.keys(example).map((lang =>
                                  <div key={lang}>{example[lang]}</div>
                                )))}
                              </div>
                            </div>;
                    })
                  }
                </div>
                <div id='view'>
                  
                </div>
                <div id='editor'>

                </div>
                <div id='hangul-keyboard' className={this.state.showVirtualKeyboard && this.state.focussedInput !== null ? '' : 'hidden'}></div>
              </div>;
    }
  }
}