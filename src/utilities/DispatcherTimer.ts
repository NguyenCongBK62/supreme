export default class DispatcherTimer {
  Interval = 0

  private _IsEnabled = false

  get IsEnabled() {
    return this._IsEnabled
  }

  public Tick!: Function

  private idInterval!: number

  public Start() {
    this.idInterval = setInterval(this.Tick, this.Interval)
    this._IsEnabled = true
  }

  public Stop() {
    clearInterval(this.idInterval)
    this._IsEnabled = false
  }
}
