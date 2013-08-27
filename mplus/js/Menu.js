XceedMeetingPlus.module('Menu', function (Menu, App, Backbone, Marionette, $) {

	Menu.main_menu = Backbone.Marionette.Layout.extend({
			template: '#main-menu',
			regions: { UpperMenu: '#UpperMenu' },
			events: { "click .sub": "showMenu2" },
			showMenu2: function(e){	
				subtitle = event.target.id; // record the name of workspace clicked 
				App.main_menu.show(new App.Menu.workspace_menu());
				App.main.show(new App.TaskModule.TaskLayout());
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

	
	Menu.workspace_menu = Backbone.Marionette.Layout.extend({
			template: '#main-menu',
			regions: { UpperMenu: '#UpperMenu' },
			events: { "click .sub": "showMenu3", "click .back": "showMenu" },
			showMenu: function(e){
				e.preventDefault();
				App.main_menu.show(new App.Menu.main_menu());
			 },
			showMenu3: function(e){
				e.preventDefault();
				subtitle2 = event.target.id;  // record the name of meeting clicked 
				App.main_menu.show(new App.Menu.workspace_menu2());
				App.main.show( new App.TimelineModule.TimelineLayout());				
			},
			onRender: function(){ 

				var w = new Menu.WorkSpaceMenu();
				w.fetch();
				this.UpperMenu.show(new Menu.WorkspaceMenuItemCollectionView({collection: w})) 
				
			}
	});
	
	Menu.WorkspaceMenuItemView = Backbone.Marionette.CompositeView.extend({ template: '#workspace-menu' });
	Menu.WorkspaceMenuItemCollectionView = Backbone.Marionette.CollectionView.extend({ itemView: Menu.WorkspaceMenuItemView });

	Menu.WorkspaceMenuItem = Backbone.Model.extend({});
    Menu.WorkSpaceMenu = Backbone.Collection.extend({ 
	
		model: Menu.WorkspaceMenuItem, 
		url: function() { return 'jsons/mplusworkspacemenu.json'},
		parse: function(response){ return response; },
		error:function(response,responseText){ alert('error..: ' + responseText); }		
		
	});

    App.vent.on('MainMenu:selectMainItem', function (id) {
        $('#MainMenu a').removeClass("selected");
		$("#"+id).addClass("selected");
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
