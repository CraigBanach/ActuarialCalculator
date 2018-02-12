<template>
  <b-row>
    <b-col/>
    <b-col>
      <b-form>
        <div class="input-div">
          <b-input-group v-bind:prepend="CapitalSelection">
            <b-form-input id="principalInput"
                          v-model="form.principal"
                          step="any"
                          type="number"
                          required>
            </b-form-input>
            <template slot="append">
              <b-dropdown text="Select">
                <b-dropdown-item id="capitalDropdown"
                                 v-on:click="CapitalSelection = 'Initial Capital'">
                  Initial Capital
                </b-dropdown-item>
                <b-dropdown-item id="returnDropdown"
                                 v-on:click="CapitalSelection = 'Bond Value'">
                  Bond Value
                </b-dropdown-item>
              </b-dropdown>
            </template>
          </b-input-group>
        </div>
        <div class="input-div">
          <b-input-group prepend="Interest Rate"
                         description="Enter Interest Rate as a decimal (i.e. 0.1)">
            <b-form-input id="rateInput"
                          type="number"
                          v-model.number="form.rate"
                          step="any"
                          required>
            </b-form-input>
          </b-input-group>
        </div>
        <div class="input-div">
          <b-input-group prepend="Investment Term"
                         description="Enter Investment Term in years (i.e. 4.5)">
            <b-form-input id="termInput"
                          type="number"
                          v-model="form.term"
                          step="any"
                          required>
            </b-form-input>
          </b-input-group>
        </div>
        <hr/>
        <b-form-group id="resultLabel"
                      v-bind:label="ResultLabel"
                      label-for="resultText">
          <b-input-group prepend="£">
            <b-form-input id="resultText"
                          type="number"
                          variant="info"
                          v-bind:value="resultValue"/>
          </b-input-group>
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
        term: 10,
        capitalSelection: 'Initial Capital'
      }
    }
  },
  methods: {
    CalculateResult: function () {
      if (this.form.capitalSelection === 'Initial Capital') {
        return (this.form.principal * (1 + this.form.rate) ** this.form.term)
      } else {
        return (this.form.principal) / ((1 + this.form.rate) ** this.form.term)
      }
    },
    RoundResult: function (result) {
      if (this.roundingSelection === 'twoDecimal') {
        result = result.toFixed(2)
      }
      return result
    }
  },
  computed: {
    resultValue: function () {
      var result = this.CalculateResult()
      result = this.RoundResult(result)
      return result
    },
    CapitalSelection: {
      get: function () {
        return this.form.capitalSelection
      },
      set: function (newValue) {
        this.form.capitalSelection = newValue
      }
    },
    ResultLabel: function () {
      if (this.CapitalSelection === 'Initial Capital') {
        return 'Return value after ' + this.form.term + ' years:'
      } else {
        return 'Present value of this bond:'
      }
    }
  }
}
</script>
