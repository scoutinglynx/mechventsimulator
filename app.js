var main = function(){
	$('.dropdown-menu').hide();
	$('.active_case').show();
	$('.focus_cases').hide();
	$('.display_tv').text('0');
	$('.display_freq').text('0');
	$('.display_fio2').text('0');
	$('.display_peep').text('0');
	$('.display_ph').text('0.00');
	$('.display_pco2').text('0');
	$('.display_po2').text('0');
	$('.display_hco3').text('0');
	
	$('.vent-btn').prop("disabled", true);
	$('.btn-disable').prop("disabled", true);
	var num_of_tries=0;    		

	/*Case scenario variables*/
	var caseSelected="0";
	
	var ibwkg=0;
	var ibwlb=0;
	
	var case_tv_min=0;
	var case_tv_max=0;
	var case_freq_min=0;
	var case_freq_max=0;
	var case_fio2_min=0;
	var case_fio2_max=0;
	var case_peep_min=0;
	var case_peep_max=0;
	var pif_value=0;

	var case_Ve_min=0; /* case minute vol min */
	var case_Ve_max=0; /* case minute vol max */
	var case_Vds=0; /* case dead space vol */
	var case_Va_min=0; /* case minute alveolar vol min */
	var case_Va_max=0; /* case minute alveolar vol min */
	var case_compliance=0; /* case alveolar compliance = alv vol/pressure (normal is 0.1L/cm H2O) */
	var case_pressure=0;  /* case pressure = (4 x surface tension)/alveolar radius (normal is 1mm Hg)*/
	var case_platpressure=0; /*plateau pressure (normal is between 25-30)*/
	var case_pip=0; /*peak inspiratory pressure (normal is between 25-40)*/
	var case_pif_best=0;  /* case best PO2/FiO2 */
	var case_pif_poor=0; /* case poor PO2/FiO2 */	
	var case_vco2=0; /* case exhaled vol CO2 */
	var case_be=0; /*base excess*/
	/*var case_Vdseratio_best=0; case best dead space/minute vol max(normal is less than 30%) */
	/*var case_Vdseratio_poor=0; /* case poor dead space/minute vol min*/
	
	/* User vent setting variables */
	var user_tv=0;
	var user_freq=0;
	var user_fio2=0;
	var user_peep=0;		
	
	var user_Ve=0;
	var user_Va=0;
	var user_pressure=0;
	var user_pif=0;
	
	/* ABG variables*/
	var ph_value=0;
	var pco2_value=0;
	var po2_value=0;
	var hco3_value=0;
	var abg_noCal=0;
	
	/*Selecting a scenario*/
	$('.dropdown-toggle').click(function(){
		$('.dropdown-menu').toggle();
	});
	
	$('.abd_sepsis').click(function(){
		var currentScenario = $('.active_case');
		var selectedScenario = $('.case_01');
	
		currentScenario.hide().removeClass('active_case');
	
		selectedScenario.show().addClass('active_case');
		
		$('.vent-btn').prop("disabled", false);
		$('.abg-btn').prop("disabled", false);
		$('.focus-btn').prop("disabled", true);
		$('.dropdown-toggle').off("click");
		num_of_tries=0;
		
		$('.tv-knob').val("0").trigger('change');
		$('.freq-knob').val("0").trigger('change');
		$('.fio2-knob').val("0").trigger('change');
		$('.peep-knob').val("0").trigger('change');
		$('.display_tv').text($('.tv-knob').val());
		$('.display_freq').text($('.freq-knob').val());
		$('.display_fio2').text($('.fio2-knob').val());
		$('.display_peep').text($('.peep-knob').val());
		
		ibwkg = 70;
		ibwlb = ibwkg*2.2;

		/*Patient's case ABG*/
		ph_value = 7.34;
		pco2_value = 27; 
		po2_value = 96;
		hco3_value = 14;
		pif_value = po2_value/0.21;
		$('.display_ph').text(ph_value.toFixed(2));
		$('.display_pco2').text(pco2_value.toFixed(0));
		$('.display_po2').text(po2_value.toFixed(0));
		$('.display_hco3').text(hco3_value.toFixed(0));
		
		/*Patient's anatomic dead space*/
		case_Vds = ibwlb*1;
		
		/*Ideal vent setting for case*/
		case_tv_min = ibwkg*5;
		case_tv_max = ibwkg*8;
		case_freq_min = 12;
		case_freq_max = 18;
		case_fio2_min = 21;
		case_fio2_max = 30;
		case_peep_min = 0;
		case_peep_max = 5;
		
		/*Calculated patient's physiologic response based on IDEAL SETTINGS*/
		case_Ve_min = case_tv_min*case_freq_min;
		case_Ve_max = case_tv_max*case_freq_max;
		case_Va_min = case_freq_min*(case_tv_min-case_Vds);
		case_Va_max = case_freq_max*(case_tv_max-case_Vds);
		case_pif_best = po2_value/case_fio2_min;
		case_pif_poor = po2_value/case_fio2_max;
		case_be = (0.9287 * hco3_value) + (13.77 * ph_value) - 124.58;
		
		case_vco2 = (((case_Va_min+case_Va_max)/2)*pco2_value)-case_be;
				
		caseSelected="1";	
		
		$('.dropdown-menu').toggle();
	});
	
	$('.head_injury').click(function(){
		var currentScenario = $('.active_case');
		var selectedScenario = $('.case_02');
		
		currentScenario.hide().removeClass('active_case');
		
		selectedScenario.show().addClass('active_case');
		
		$('.vent-btn').prop("disabled", false);
		$('.abg-btn').prop("disabled", false);
		$('.focus-btn').prop("disabled", true);
		$('.dropdown-toggle').off("click");
		num_of_tries=0;
		
		$('.tv-knob').val("0").trigger('change');
		$('.freq-knob').val("0").trigger('change');
		$('.fio2-knob').val("0").trigger('change');
		$('.peep-knob').val("0").trigger('change');
		$('.display_tv').text($('.tv-knob').val());
		$('.display_freq').text($('.freq-knob').val());
		$('.display_fio2').text($('.fio2-knob').val());
		$('.display_peep').text($('.peep-knob').val());
		
		ibwkg = 70;
		ibwlb = ibwkg*2.2;

		/*Patient's case ABG*/
		ph_value = 7.40;
		pco2_value = 38; 
		po2_value = 98;
		hco3_value = 24;
		pif_value = po2_value/0.21;
		$('.display_ph').text(ph_value.toFixed(2));
		$('.display_pco2').text(pco2_value.toFixed(0));
		$('.display_po2').text(po2_value.toFixed(0));
		$('.display_hco3').text(hco3_value.toFixed(0));

		/*Patient's anatomic dead space*/
		case_Vds = ibwlb*1;
		
		/*Ideal vent setting for case*/
		case_tv_min = ibwkg*5;
		case_tv_max = ibwkg*8;
		case_freq_min = 14;
		case_freq_max = 18;
		case_fio2_min = 21;
		case_fio2_max = 30;
		case_peep_min = 0;
		case_peep_max = 5;
		
		/*Calculated patient's physiologic response based on IDEAL SETTINGS*/
		case_Ve_min = case_tv_min*case_freq_min;
		case_Ve_max = case_tv_max*case_freq_max;
		case_Va_min = case_freq_min*(case_tv_min-case_Vds);
		case_Va_max = case_freq_max*(case_tv_max-case_Vds);
		case_pif_best = po2_value/case_fio2_min;
		case_pif_poor = po2_value/case_fio2_max;
		
		case_vco2 = ((case_Va_min+case_Va_max)/2)*pco2_value;
						
		caseSelected="2";		
		
		$('.dropdown-menu').toggle();
	});
	
	$('.ards').click(function(){
		var currentScenario = $('.active_case');
		var selectedScenario = $('.case_03');
		
		currentScenario.hide().removeClass('active_case');
		
		selectedScenario.show().addClass('active_case');
		
		$('.vent-btn').prop("disabled", false);
		$('.abg-btn').prop("disabled", false);
		$('.focus-btn').prop("disabled", true);
		$('.dropdown-toggle').off("click");
		num_of_tries=0;
		
		$('.tv-knob').val("0").trigger('change');
		$('.freq-knob').val("0").trigger('change');
		$('.fio2-knob').val("0").trigger('change');
		$('.peep-knob').val("0").trigger('change');
		$('.display_tv').text($('.tv-knob').val());
		$('.display_freq').text($('.freq-knob').val());
		$('.display_fio2').text($('.fio2-knob').val());
		$('.display_peep').text($('.peep-knob').val());
		
		ibwkg = 70;
		ibwlb = ibwkg*2.2;

		/*Patient's case ABG*/
		ph_value = 7.53;
		pco2_value = 30; 
		po2_value = 40;
		hco3_value = 24;
		pif_value = po2_value/0.21;
		$('.display_ph').text(ph_value.toFixed(2));
		$('.display_pco2').text(pco2_value.toFixed(0));
		$('.display_po2').text(po2_value.toFixed(0));
		$('.display_hco3').text(hco3_value.toFixed(0));
		
		/*Patient's anatomic dead space*/
		case_Vds = ibwlb*2;
		
		/*Ideal vent setting for case*/
		case_tv_min = ibwkg*4;
		case_tv_max = ibwkg*6;
		case_freq_min = 20;
		case_freq_max = 30;
		case_fio2_min = 30;
		case_fio2_max = 100;
		case_peep_min = 5;
		case_peep_max = 24;
		
		/*Calculated patient's physiologic response based on IDEAL SETTINGS*/
		case_Ve_min = case_tv_min*case_freq_min;
		case_Ve_max = case_tv_max*case_freq_max;
		case_Va_min = case_freq_min*(case_tv_min-case_Vds);
		case_Va_max = case_freq_max*(case_tv_max-case_Vds);
		case_pif_best = po2_value/case_fio2_min;
		case_pif_poor = po2_value/case_fio2_max;
		
		case_vco2 = ((case_Va_min+case_Va_max)/2)*pco2_value;
						
		caseSelected="3";
		
		$('.dropdown-menu').toggle();
	});
	
	$('.asthma_rf').click(function(){
		var currentScenario = $('.active_case');
		var selectedScenario = $('.case_04');
		
		currentScenario.hide().removeClass('active_case');
		
		selectedScenario.show().addClass('active_case');
		
		$('.vent-btn').prop("disabled", false);
		$('.abg-btn').prop("disabled", false);
		$('.focus-btn').prop("disabled", true);
		$('.dropdown-toggle').off("click");
		num_of_tries=0;
		
		$('.tv-knob').val("0").trigger('change');
		$('.freq-knob').val("0").trigger('change');
		$('.fio2-knob').val("0").trigger('change');
		$('.peep-knob').val("0").trigger('change');	
		$('.display_tv').text($('.tv-knob').val());
		$('.display_freq').text($('.freq-knob').val());
		$('.display_fio2').text($('.fio2-knob').val());
		$('.display_peep').text($('.peep-knob').val());		
		
		ibwkg = 70;
		ibwlb = ibwkg*2.2;

		/*Patient's case ABG*/
		ph_value = 7.22;
		pco2_value = 60; 
		po2_value = 80;
		hco3_value = 24;
		pif_value = po2_value/0.21;
		$('.display_ph').text(ph_value.toFixed(2));
		$('.display_pco2').text(pco2_value.toFixed(0));
		$('.display_po2').text(po2_value.toFixed(0));
		$('.display_hco3').text(hco3_value.toFixed(0));
		
		/*Patient's anatomic dead space*/
		case_Vds = ibwlb*1.3;
		
		/*Ideal vent setting for case*/
		case_tv_min = ibwkg*5;
		case_tv_max = ibwkg*8;
		case_freq_min = 8;
		case_freq_max = 10;
		case_fio2_min = 30;
		case_fio2_max = 40;
		case_peep_min = 5;
		case_peep_max = 6;
		
		/*Calculated patient's physiologic response based on IDEAL SETTINGS*/
		case_Ve_min = case_tv_min*case_freq_min;
		case_Ve_max = case_tv_max*case_freq_max;
		case_Va_min = case_freq_min*(case_tv_min-case_Vds);
		case_Va_max = case_freq_max*(case_tv_max-case_Vds);
		case_pif_best = po2_value/case_fio2_min;
		case_pif_poor = po2_value/case_fio2_max;
		
		case_vco2 = ((case_Va_min+case_Va_max)/2)*pco2_value;
						
		caseSelected="4";
		
		$('.dropdown-menu').toggle();
	});
	
	$('.focus-btn').click(function(){
		$('.dropdown-toggle').on("click", function(){
			$('.dropdown-menu').toggle();
		});
	});
	
	/*Setting the vent*/
	$('.vent-btn').click(function(){

		var nextCalculation = 0;
		var errorCheck = 0;
		num_of_tries++;
				
		if ($('.tv-knob').val()==0 || $('.freq-knob').val()==0 || $('.fio2-knob').val()==0 || $('.peep-knob').val()==0){
			errorCheck = 2;
			nextCalculation = 0;
			num_of_tries--;
		}
		else if (errorCheck == 0 && $('.tv-knob').val() > case_tv_max){
			errorCheck = 1;
			abg_noCal=1;
			nextCalculation = 0;
		}
		else if (errorCheck == 0 && $('.peep-knob').val() > case_peep_max){
			errorCheck = 1;
			nextCalculation = 0;
		}
		else{
			nextCalculation = 1;
		} 
		
		if (nextCalculation == 1){
				
			/* Vent setting variables */
			user_tv = $('.tv-knob').val();
			user_freq = $('.freq-knob').val();
			user_fio2 = $('.fio2-knob').val();
			user_peep = $('.peep-knob').val();		
			$('.display_tv').text(user_tv);
			$('.display_freq').text(user_freq);
			$('.display_fio2').text(user_fio2);
			$('.display_peep').text(user_peep);
		
			/*Calculated patient's physiologic response based on USER SETTINGS*/
			user_Ve = user_tv*user_freq;
			user_Va = user_freq*(user_tv-case_Vds);
			user_pif = po2_value/user_fio2;
			
			nextCalculation = 2;
		}		
		
		if (nextCalculation == 2){
			pco2_value = case_vco2/user_Va;
			
			ph_value = 6.1 + Math.log10(hco3_value/(0.03*pco2_value));
			
			po2_value = (user_fio2/100)*pif_value*(user_peep/case_peep_max);
			
			$('.display_ph').text(ph_value.toFixed(2));
			$('.display_pco2').text(pco2_value.toFixed(0));
			$('.display_po2').text(po2_value.toFixed(0));
			$('.display_hco3').text(hco3_value.toFixed(0));
			
			if (caseSelected == 2){
				if (ph_value < 7.3 || ph_value > 7.45){
					errorCheck = 3;
				}
				else if (pco2_value < 35 || pco2_value > 45){
					errorCheck = 3;
				}
				else if (po2_value < 60 || po2_value > 150){
					errorCheck = 3;
				}
				else{
					errorCheck = 0;
				}
			}
			else{
				if (ph_value < 7.3 || ph_value > 7.45){
					errorCheck = 3;
				}
				else if (pco2_value < 25 || pco2_value > 50){
					errorCheck = 3;
				}
				else if (po2_value < 60 || po2_value > 150){
					errorCheck = 3;
				}
				else{
					errorCheck = 0;
				}
			}
		}
		
		/*Ventilator problems*/
		if (errorCheck == 1 && num_of_tries < 3){
			modal({
				type  : 'warning',
				title : 'Warning',
				text  : 'High pressure alarm is going off!',
				center : false,
			});
		}
		else if (errorCheck == 1 && num_of_tries >= 3){
			modal({
				type  : 'warning',
				title : 'Good try',
				text  : 'You have exceeded the maximum attempts to reach the goals of this case. Click the <b style = "color: red"> "teaching points" </b> button on the lower right to review the important points of this case. After, select the next case.',
				center : false,
			});
			
			$('.focus-btn').prop("disabled", false);
			$('.vent-btn').prop("disabled", true);
		}
		else if (errorCheck == 2){
			modal({
				type  : 'warning',
				title : 'Instructions',
				text  : 'Please adjust all the settings of your vent before clicking on the set button.',
				center : false,
			});
		}
		else if (errorCheck == 3 && num_of_tries < 3){
			modal({
				type  : 'warning',
				title : 'Not done yet...',
				text  : 'The mechanical vent setting is in place and thirty minutes later, the respiratory therapist hands you the results of the ABG that you ordered. The respiratory therapist: <b style = "color: red"> "Did you want to change the vent setting?" <b>',
				center : false,
			});
		}
		else if (errorCheck == 3 && num_of_tries >= 3){
			modal({
				type  : 'warning',
				title : 'Good try',
				text  : 'You have exceeded the maximum attempts to reach the goals of this case. Click the <b style = "color: red"> "teaching points" </b> button on the lower right to review the important points of this case. After, select the next case.',
				center : false,
			});
			
			$('.focus-btn').prop("disabled", false);
			$('.vent-btn').prop("disabled", true);
		}
		else if (errorCheck == 0){
			modal({
				type  : 'warning',
				title : 'Case completed',
				text  : 'Good job. Click the <b style = "color: red"> "teaching points" </b> button on the lower right to review the important points of this case. After, select the next case.',
				center : false,
			});
			
			$('.focus-btn').prop("disabled", false);
			$('.vent-btn').prop("disabled", true);
		}
	});
	
}
$(document).ready(main);