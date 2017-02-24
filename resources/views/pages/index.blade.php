@extends('layout')
@section('content')
<div class="main-buttons-wrap">
		<div class="heading-wrap dragMe" data-type="heading">Create heading</div>
		<div class="dragMe" data-type="textfield">Create textfield</div>
		<div class="dragMe" data-type='video' data-toggle="modal" data-target="#myModal">Add video</div>
		<div class="dragMe" data-type='gallery' data-toggle="modal">Add gallery</div>
		<div class="dragMe" data-type='map' data-toggle="modal">Add map</div>
		<div class="dragMe" data-type='br'>br</div>
		<div class="dragMe" data-type='hr'>hr</div>
		<button onclick="addButtons()">Add</button>
		<button onclick="removeButtons()">Remove</button>
	</div>
	
	<!-- <div class="dragMe" id="two">Drag me!</div>
	<div class="dragMe" id="three">Drag me!</div> -->
	<div id="container">
		<div class="items"></div>
	</div>
@stop