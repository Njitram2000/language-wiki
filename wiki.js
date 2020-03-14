'use strict';

class Wiki extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: true, data: [] };
    const that = this;
    $.getJSON({url: '/wiki', success: (data) => {
      this.setState((state, props) => ({loading: false, data}));
    }});
  }

  onKeyUp = (event) => {
    // console.log(event.target.value);
  }

  componentDidMount() {
    setTimeout(() => {
      hangulKeyboard();
    }, 100);
  }

  render() {
    if (this.state.loading) {
      return 'loading...';
    } else {
      return  <div>
                <div><input id="hangul-editor" type="text" onKeyUp={this.onKeyUp}/></div>
                {this.state.data.map((entry) => {
                  return  <div key="entry.title">
                            <div>{entry.title}</div>
                            <div>{entry.tags}</div>
                            <div>{entry.source}</div>
                            <div>{entry.details}</div>
                            <div className="examples">
                              {entry.examples.map((example) => Object.keys(example).map((lang =>
                                <div key={lang}>{example[lang]}</div>
                              )))}
                            </div>
                            
                          </div>;
                })}
                <div id="keyboard"></div>
              </div>;
    }
  }
}