var Data = {
  questions: {
    list: [],
    fetch: function () {
      m.request({
        method: "GET",
        url: "/questions"
      })
        .then(function (data) {
          Data.questions.list = data;
        })
    }
  }
}

var Choice = {
  click: function(n){
    return function(){
      Data.selected = n
    }
  },
  classes: function(n){
    if (Data.selected === n){
      return 'active'
    } else {
      return ''
    }
  },
  view: function(vnode){
    var n = vnode.attrs.index
    return m('.choice',{ class: Choice.classes(n), onclick: Choice.click(n) },
      m('span.l'),
      m('span.v',Data.choices[n])
    )
  }
}

  // const url_base = "";
  // const url_path = "/submit";

var App = {
  oninit: Data.questions.fetch,
  submit: function(){
    m.request({
        method: "PUT",
        url: "/submit",
        body: {selected: Data.selected},
    })
    .then(function(data) {
      console.log('data',data)
    })
  },
  view: function() {
    return m('main', [
      m("h1", Data.title),
      m('article',
        m('h2','Question:'),
        m('.question',Data.questions),
        m(Choice,{index: 0}),
        m(Choice,{index: 1}),
        m(Choice,{index: 2}),
        m(Choice,{index: 3}),
        m('.submit',
          m("button", {onclick: App.submit}, 'Submit')
        )
      )
    ])
  }
}

m.mount(document.body, App)