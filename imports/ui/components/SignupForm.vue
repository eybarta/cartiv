<template>
	<h4>SIGN UP</h4>
	<ul class="form">
		<li>
			<label for="name">
				<input id="name" type="text" v-model="name" required>
				<span>Name</span>
			</label>
		</li>
		<li>
			<label for="email">
				<input id="email" type="email" v-model="email" required>
				<span>Email</span>
			</label>
		</li>
		<li>
			<label for="password">
				<input id="password" type="password" v-model="password" required>
				<span>Password</span>
			</label>
		</li>
		<li>
			<label for="password2">
				<input id="password2" type="password" @change="confirmPassword" required>
				<span>Confirm Password</span>
			</label>
		</li>
	</ul>
	<div class="txt-right">
		<button class="btn-success" @click="createAccount">CREATE ACCOUNT</button>
	</div>
</template>

<script>
export default {
	data() {
		return {
			name: '',
			email: '',
			password: ''
		}
	},
	created() {
		console.log('sign up form was created successfuly');
	},
	methods: {
		confirmPassword(e) {
			console.log(e.target)
			return e.target.value==this.password
		},
		createAccount() {
			var ref = this;
			console.log(ref.name, " :: ", ref.email, " :: ", ref.password);
	  		Meteor.call("createUsers", ref.email, ref.password, function(res) {
	  			console.log(res);
				if (res)
					console.log(res);
				else {
					console.log('success! >> ', Meteor.user());

				}
	  		})
  
		}
	}
}
</script>
<style lang="stylus">
.form
	margin 0 auto
	padding 0
	li
		margin 0 0 20px
		list-style none
		padding 0
		label
			span
				display inline-block
				font-size 16px
				color #c3c3c3
				position relative
				transform translate(0,-120%)
				transition transform 220ms ease, padding 220ms ease, font-size 220ms ease, color 220ms ease
				padding 0
			input
				border 0
				border-bottom 1px solid #202020
				padding 0
				width 100%
				&:focus + span,
				&:valid + span
					color #a3a3a3
					transform translate(0,-300%)
					font-size 12px
					padding 0
				&:valid + span
					color #98d29f
					
			
		
		

</style>