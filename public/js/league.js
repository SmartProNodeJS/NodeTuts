$(function() {
  let gvLeagues, dlgLeague, dpStart, dpEnd, lvSponsors;

  gvLeagues = $('#gvLeagues').kendoGrid({
    columns: [{
        command: [{
          click: function(e) {
            e.preventDefault();

            const tr = $(e.target).closest('tr');
            const data = this.dataItem(tr);
            const sponsorMapFx = function(sponsor) {
              return { name: sponsor };
            };

            this.select(tr);

            $('#txtLeagueName').val(data.name);
            $('#hfLeagueId').val(data._id);
            dpStart.value(data.date_start);
            dpEnd.value(data.date_end);
            lvSponsors.setDataSource(new kendo.data.DataSource({
              data: data.sponsors.map(sponsorMapFx)
            }));
            $('#txtOrganiser').val(data.organiser);

            dlgLeague.center().open();
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
                  gvLeagues.dataSource.read();
                },
                type: "DELETE",
                url: "/api/league/" + data._id
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
      { field: 'name', title: 'Name of League' },
      { field: 'date_start', format: '{0:dd/MM/yyyy}', title: 'Starting Date' },
      { field: 'date_end', format: '{0:dd/MM/yyyy}', title: 'End Date' },
      { encoded: false, field: 'sponsors_string', title: 'Sponsors' },
      { field: 'organiser', title: 'Organiser' }
    ],
    dataSource: {
      error: function(e) {
        alert('Error');
      },
      requestEnd: function(e) {
        if (e.response) {
          for (let i = 0; i < e.response.length; i++) {
            const league = e.response[i];
            let sponsorsString = '';

            for (let j = 0; j < league.sponsors.length; j++) {
              const p = league.sponsors[j];
              sponsorsString += p + ';';
            }

            if (sponsorsString) {
              sponsorsString = sponsorsString.substr(0, sponsorsString.length - 1);
            }

            league.sponsors_string = '<ol><li>' + sponsorsString.replace(/;/g, '</li><li>') + '</li></ol>';
            league.date_start = new Date(league.date_start);
            league.date_end = new Date(league.date_end);
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
          url: '/api/league/all'
        }
      }
    },
    noRecords: { template: '<div style="padding: 5px 0">No leagues</div>' },
    resizable: true,
    selectable: true,
    toolbar: [{ iconClass: 'fa fa-plus', name: 'new', text: ' New league' }]
  }).getKendoGrid();

  dlgLeague = $('#dlgLeague').kendoWindow({
    activate: function() {
      $('#txtLeagueName').focus();
    },
    title: 'League Info',
    visible: false,
    width: 400
  }).getKendoWindow();

  dpStart = $('#dpStart').kendoDatePicker({
    format: 'dd/MM/yyyy'
  }).getKendoDatePicker();

  dpEnd = $('#dpEnd').kendoDatePicker({
    format: 'dd/MM/yyyy'
  }).getKendoDatePicker();

  lvSponsors = $('#lvSponsors').kendoListView({
    altTemplate: '<div class="alt-item">#:name#</div>',
    selectable: true,
    template: '<div class="item">#:name#</div>'
  }).getKendoListView();

  $('#btnCancel').click(function() {
    dlgLeague.close();
  });

  $('#btnSave').click(function() {
    if ($('#txtLeagueName').val().trim() && dpStart.value() && dpEnd.value() && lvSponsors.dataItems().length > 0 && $('#txtOrganiser').val().trim()) {
      let sponsors = [];
      const sponsorList = lvSponsors.dataItems();

      for (let i = 0; i < sponsorList.length; i++) {
        const p = sponsorList[i];

        sponsors.push(p.name);
      }

      $.ajax({
        data: {
          _id: $('#hfLeagueId').val(),
          name: $('#txtLeagueName').val().trim(),
          date_start: dpStart.value(),
          date_end: dpEnd.value(),
          sponsors: JSON.stringify(sponsors),
          organiser: $('#txtOrganiser').val().trim()
        },
        error: function(e) {
          alert('Error');
        },
        success: function() {
          alert('Success');
          gvLeagues.dataSource.read();
          dlgLeague.close();
        },
        type: "POST",
        url: "/api/league"
      });
    }
  });

  $('#gvLeagues').on('click', '.k-grid-new', function(e) {
    e.preventDefault();
    $('#txtLeagueName').val(randomSentence(3));
    $('#txtOrganiser').val(randomSentence(3));
    $('#txtSponsor').val(randomSentence(2));
    $('#hfLeagueId').val('0');
    dpStart.value(new Date());
    dpEnd.value(new Date((new Date()).setMonth(13)));
    lvSponsors.clear('No sponsors');
    dlgLeague.center().open();
  });

  $('#btnAddSponsor').click(function() {
    if ($('#txtSponsor').val().trim()) {
      lvSponsors.dataSource.add({
        name: $('#txtSponsor').val().trim()
      });
      $('#txtSponsor').val(randomSentence(2));
    } else {
      alert('Please type sponsor name');
      $('#txtSponsor').focus();
    }
  });
});