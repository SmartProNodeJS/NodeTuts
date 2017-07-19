$(function() {
  let gvTeams, dlgTeam, ddlSport, mtsPlayers;

  gvTeams = $('#gvTeams').kendoGrid({
    columns: [{
        command: [{
          click: function(e) {
            e.preventDefault();

            const tr = $(e.target).closest('tr');
            const data = this.dataItem(tr);

            this.select(tr);

            $('#txtTeamName').val(data.team_name);
            $('#hfTeamId').val(data._id);
            ddlSport.value(data.sport_name);

            let playersId = [];

            for (let i = 0; i < data.players.length; i++) {
              const p = data.players[i];

              playersId.push(p._id);
            }

            mtsPlayers.value(playersId);
            dlgTeam.center().open();
          },
          iconClass: 'fa fa-edit',
          name: 'ed',
          text: ' Edit'
        }, {
          click: function(e) {
            e.preventDefault();

            const tr = $(e.target).closest('tr');
            const data = this.dataItem(tr);
            const ok = confirm('Sure?');

            if (ok) {
              $.ajax({
                error: function(e) {
                  alert('Error');
                },
                success: function() {
                  alert('Success');
                  gvTeams.dataSource.read();
                },
                type: "DELETE",
                url: "/api/team/" + data._id
              });
            }
          },
          iconClass: 'fa fa-remove',
          name: 'rm',
          text: ' Remove'
        }],
        title: 'Actions',
        width: 200
      },
      { field: '_id', hidden: true },
      { field: 'team_name', title: 'Team Name' },
      { field: 'sport_desc', title: 'Sport' },
      { field: 'sport_name', hidden: true },
      { encoded: false, field: 'players_string', title: 'Players' }
    ],
    dataSource: {
      error: function(e) {
        alert('Error');
      },
      requestEnd: function(e) {
        if (e.response) {
          for (let i = 0; i < e.response.length; i++) {
            const team = e.response[i];
            let playerString = '';

            for (let j = 0; j < team.players.length; j++) {
              const p = team.players[j];
              playerString += p.first_name + ' ' + p.last_name + ';';
            }

            if (playerString) {
              playerString = playerString.substr(0, playerString.length - 1);
            }

            team.players_string = '<ol><li>' + playerString.replace(/;/g, '</li><li>') + '</li></ol>';
          }
        }
      },
      schema: {
        total: function(response) {
          return response.length;
        }
      },
      transport: {
        read: {
          dataType: 'json',
          type: 'GET',
          url: '/api/team/all'
        }
      }
    },
    resizable: true,
    selectable: true,
    toolbar: [{ iconClass: 'fa fa-plus', name: 'new', text: ' New team' }]
  }).getKendoGrid();

  dlgTeam = $('#dlgTeam').kendoWindow({
    activate: function() {
      $('#txtTeamName').focus();
    },
    title: 'Team Info',
    visible: false,
    width: 400
  }).getKendoWindow();

  ddlSport = $('#ddlSport').kendoDropDownList({
    dataSource: {
      error: function(e) {
        alert('Error');
      },
      transport: {
        read: {
          dataType: 'json',
          type: 'GET',
          url: '/api/sport/all'
        }
      }
    },
    dataTextField: 'desc',
    dataValueField: 'name',
    optionLabel: 'Select...'
  }).getKendoDropDownList();

  mtsPlayers = $('#mtsPlayers').kendoMultiSelect({
    autoClose: false,
    dataSource: {
      error: function(e) {
        alert('Error');
      },
      requestEnd: function(e) {
        if (e.response) {
          for (let i = 0; i < e.response.length; i++) {
            const p = e.response[i];

            p.full_name = p.first_name + ' ' + p.last_name;
          }
        }
      },
      transport: {
        read: {
          dataType: 'json',
          type: 'GET',
          url: '/api/player/all'
        }
      }
    },
    dataTextField: 'full_name',
    dataValueField: '_id',
    placeholder: 'Select...'
  }).getKendoMultiSelect();

  $('#btnCancel').click(function() {
    dlgTeam.close();
  });

  $('#btnSave').click(function() {
    if ($('#txtTeamName').val().trim() && ddlSport.select() > 0 && mtsPlayers.value().length > 0) {
      let players = [];
      const selectedPlayers = mtsPlayers.dataItems();

      for (let i = 0; i < selectedPlayers.length; i++) {
        const p = selectedPlayers[i];

        players.push({ first_name: p.first_name, last_name: p.last_name, _id: p._id });
      }

      $.ajax({
        data: {
          _id: $('#hfTeamId').val(),
          team_name: $('#txtTeamName').val().trim(),
          sport_desc: ddlSport.text(),
          sport_name: ddlSport.value(),
          players: JSON.stringify(players)
        },
        error: function(e) {
          alert('Error');
        },
        success: function() {
          alert('Success');
          mtsPlayers.dataSource.read();
          gvTeams.dataSource.read();
          dlgTeam.close();
        },
        type: "POST",
        url: "/api/team"
      });
    }
  });

  $('#gvTeams').on('click', '.k-grid-new', function(e) {
    e.preventDefault();
    $('#txtTeamName').val(randomSentence(3));
    $('#hfTeamId').val('0');
    ddlSport.select(0);
    mtsPlayers.value([]);
    dlgTeam.center().open();
  });
});