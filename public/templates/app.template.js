export default Handlebars.compile(`
  <article class="app-card js-app-card" id="{{id}}" >
    <div class="app-icon">
      {{#if icon}}<img src="{{icon}}" alt="{{id}}">{{/if}}
    </div>
    <div class="app-info">
      <h3>{{name}}</h3>
      <p>{{summary}}</p>
    </div>
  </article>
`);
