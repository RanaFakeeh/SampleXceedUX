XceedMeetingPlus.module('Menu', function (Menu, App, Backbone, Marionette, $) {

	Menu.main_menu = Backbone.Marionette.Layout.extend({
			template: '#main-menu',
			regions: { UpperMenu: '#UpperMenu' },
			events: { "click .sub": "showMenu2" },
			showMenu2: function(e){
				App.main_menu.show(new App.Menu.workspace_menu());
			 },
			onRender: function(){ 

				var u = new Menu.MainMenu();
				u.fetch();
				this.UpperMenu.show(new Menu.MenuItemCollectionView({collection: u})) 
				
			}
	});
	
	Menu.MenuItemView = Backbone.Marionette.CompositeView.extend({ template: '#home-menu' });
	Menu.MenuItemCollectionView = Backbone.Marionette.CollectionView.extend({ itemView: Menu.MenuItemView });

	Menu.MainMenuItem = Backbone.Model.extend({});
    Menu.MainMenu = Backbone.Collection.extend({ 
	
		model: Menu.MainMenuItem, 
		url: function() { return 'jsons/mplusmainmenu.json'},
		parse: function(response){ return response; },
		error:function(response,responseText){ alert('error..: ' + responseText); }		
		
	});

    App.vent.on('MainMenu:selectMainItem', function (id) {
        $('#MainMenu a').removeClass("selected");
		$("#"+id).addClass("selected");
    });


	
	Menu.workspace_menu = Backbone.Marionette.ItemView.extend({ 
		template: '#workspace-menu',
		events: { "click .sub": "showMenu3", "click .back": "showMenu" },
		showMenu: function(e){
			e.preventDefault();
			App.main_menu.show(new App.Menu.main_menu());
		 },
		showMenu3: function(e){
			e.preventDefault();
			App.main_menu.show(new App.Menu.workspace_menu2());
		 }
	});
	
	Menu.workspace_menu2 = Backbone.Marionette.ItemView.extend({ 
		template: '#workspace-menu2',
		events: { "click .back": "showMenu" },
		showMenu: function(e){
			e.preventDefault();
			App.main_menu.show(new App.Menu.workspace_menu());
		 }
	});

});
