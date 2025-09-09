export default function TropicalHeader() {
  return (
    <div className="text-center mb-8">
      <div className="tiki-header mb-6 relative overflow-hidden">
        <h1 className="text-5xl md:text-8xl font-bold mb-4 gradient-text relative z-10">
          🌴 WOODLAND PARK TIKI ROUTE 🌴
        </h1>
        <div className="text-3xl md:text-4xl floating-element">
          🦩🥥🍹❄️🛣️❄️🍹🥥🦩
        </div>
        
        {/* Floating tiki elements */}
        <div className="absolute top-4 left-1/4 text-3xl floating-element" style={{animationDelay: '1s'}}>🗿</div>
        <div className="absolute bottom-4 right-1/4 text-3xl floating-element" style={{animationDelay: '3s'}}>🌺</div>
      </div>
    </div>
  )
}