<template>
  <b-container>
    <b-row>
      <b-col/>
      <b-col>
        <b-form>
          <b-form-group id="principalLabel"
                        label="Principal:"
                        label-for="principalInput">
            <b-form-input id="principalInput"
                          v-model="form.principal"
                          type="number"
                          required
                          placeholder="Enter Principal ">
            </b-form-input>
          </b-form-group>
          <b-form-group id="rateLabel"
                        label="Interest Rate:"
                        label-for="rateInput"
                        description="Enter Interest Rate as a decimal (i.e. 0.1)">
            <b-form-input id="rateInput"
                          type="number"
                          v-model.number="form.rate"
                          required
                          placeholder="Enter Interest Rate">
            </b-form-input>
          </b-form-group>
          <b-form-group id="termLabel"
                        label="Investment Term:"
                        label-for="termInput"
                        description="Enter Investment Term in years (i.e. 4.5)">
            <b-form-input id="termInput"
                          type="number"
                          v-model="form.term"
                          required
                          placeholder="Enter Investment Term">
            </b-form-input>
          </b-form-group>
          <b-form-group id="resultLabel"
                        v-bind:label="'Total capital after ' + form.term + ' years:'"
                        label-for="resultText">
            <b-form-input id="resultText"
                          type="number"
                          plaintext
                          variant="info"
                          v-bind:value="resultValue"/>
          </b-form-group>
          <b-form-group id="roundLabel"
                        label="Rounding:"
                        label-for="roundInput">
            <b-form-radio-group id="roundInput"
                                v-model="roundingSelection"
                                :options="roundingOptions">
            </b-form-radio-group>
          </b-form-group>
        </b-form>
      </b-col>
      <b-col/>
    </b-row>
  </b-container>
</template>

<script>
export default {
  data () {
    return {
      roundingSelection: 'twoDecimal',
      roundingOptions: [
        { text: 'Two decimal places', value: 'twoDecimal' },
        { text: 'No Rounding', value: 'noRounding' }
      ],
      form: {
        principal: 100,
        rate: 0.05,
        term: 10
      }
    }
  },
  computed: {
    resultValue: function () {
      var result = (this.form.principal * (1 + this.form.rate) ** this.form.term)
      if (this.roundingSelection === 'twoDecimal') {
        result = result.toFixed(2)
      }
      return result
    }
  }
}
</script>
