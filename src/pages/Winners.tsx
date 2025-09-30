@@ .. @@
         {/* Stats Overview */}
-        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 my-8 sm:my-12">
-          <div className="stats-card-navy text-center animate-slide-up hover:scale-105 transition-transform duration-300 celebration-container">
+        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 my-8 sm:my-12">
+          <div className="stats-card-navy-glow text-center animate-slide-up hover:scale-105 transition-transform duration-300 celebration-container">
             <div className="celebration-particles">
               {Array.from({ length: 4 }).map((_, i) => (
                 <div key={i} className={`celebration-particle celebration-particle-${i + 1}`}></div>
               ))}
             </div>
-            <Trophy className="h-8 w-8 mx-auto mb-3" />
+            <Trophy className="h-8 w-8 mx-auto mb-3 icon-glow-white" />
             <div className="text-2xl sm:text-3xl font-bold mb-1">{winners.length}</div>
             <div className="text-xs sm:text-sm opacity-90">Total Winners</div>
           </div>

-          <div className="stats-card-orange text-center animate-slide-up hover:scale-105 transition-transform duration-300 celebration-container" style={{ animationDelay: '0.1s' }}>
+          <div className="stats-card-orange-glow text-center animate-slide-up hover:scale-105 transition-transform duration-300 celebration-container" style={{ animationDelay: '0.1s' }}>
             <div className="celebration-particles">
               {Array.from({ length: 4 }).map((_, i) => (
                 <div key={i} className={`celebration-particle celebration-particle-${i + 1}`}></div>
               ))}
             </div>
-            <Award className="h-8 w-8 mx-auto mb-3 text-primary" />
+            <Award className="h-8 w-8 mx-auto mb-3 text-white icon-glow-white" />
             <div className="text-2xl sm:text-3xl font-bold mb-1">{events.length}</div>
             <div className="text-white/90 text-xs sm:text-sm">Different Events</div>
           </div>

-          <div className="stats-card-navy text-center animate-slide-up hover:scale-105 transition-transform duration-300 celebration-container" style={{ animationDelay: '0.2s' }}>
+          <div className="stats-card-navy-glow text-center animate-slide-up hover:scale-105 transition-transform duration-300 celebration-container" style={{ animationDelay: '0.2s' }}>
             <div className="celebration-particles">
               {Array.from({ length: 4 }).map((_, i) => (
                 <div key={i} className={`celebration-particle celebration-particle-${i + 1}`}></div>
               ))}
             </div>
-            <Calendar className="h-8 w-8 mx-auto mb-3 text-white" />
+            <Calendar className="h-8 w-8 mx-auto mb-3 text-white icon-glow-white" />
             <div className="text-2xl sm:text-3xl font-bold mb-1">{years.length}</div>
             <div className="text-white/90 text-xs sm:text-sm">Years of Excellence</div>
           </div>
@@ .. @@

         {/* Achievement Highlights */}
-        <div className="mt-12 sm:mt-16 stats-card-navy rounded-2xl p-6 sm:p-8 text-white shadow-elevated animate-slide-up hover:scale-[1.02] transition-transform duration-300 mx-2 sm:mx-0 celebration-container">
+        <div className="mt-12 sm:mt-16 stats-card-navy-enhanced rounded-3xl p-6 sm:p-8 text-white shadow-elevated animate-slide-up hover:scale-[1.02] transition-transform duration-300 mx-2 sm:mx-0 celebration-container relative overflow-hidden">
+          {/* Internal glow effects */}
+          <div className="absolute top-0 right-1/4 w-48 h-48 bg-white/10 rounded-full blur-2xl"></div>
+          <div className="absolute bottom-0 left-1/4 w-40 h-40 bg-accent/20 rounded-full blur-xl"></div>
+          
           <div className="celebration-particles">
             {Array.from({ length: 8 }).map((_, i) => (
               <div key={i} className={`celebration-particle celebration-particle-${i + 1}`}></div>
             ))}
           </div>
-          <h2 className="text-xl sm:text-2xl font-bold text-center mb-6">Achievement Highlights</h2>
-          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
+          <h2 className="text-xl sm:text-2xl font-bold text-center mb-6 relative z-10 stats-title-glow">Achievement Highlights</h2>
+          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 relative z-10">
             <div className="space-y-4">
               <h3 className="text-base sm:text-lg font-semibold text-white">Most Active Events</h3>
               {events.slice(0, 3).map(event => {
                 const eventWinners = winners.filter(w => w.event === event);
                 return (
-                  <div key={event} className="flex justify-between items-center p-3 bg-white/20 backdrop-blur-sm rounded-xl shadow-soft hover:bg-white/30 transition-colors duration-300 hover:scale-105">
+                  <div key={event} className="flex justify-between items-center p-3 success-story-card rounded-xl hover:scale-105 transition-all duration-300">
                     <span className="text-white text-sm sm:text-base truncate pr-2">{event}</span>
                     <span className="text-yellow-300 font-semibold text-xs sm:text-sm flex-shrink-0">{eventWinners.length} winners</span>
                   </div>
@@ .. @@
                 .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                 .slice(0, 3)
                 .map(winner => (
-                  <div key={winner.id} className="flex justify-between items-center p-3 bg-white/20 backdrop-blur-sm rounded-xl shadow-soft hover:bg-white/30 transition-colors duration-300 hover:scale-105">
+                  <div key={winner.id} className="flex justify-between items-center p-3 success-story-card rounded-xl hover:scale-105 transition-all duration-300">
                     <div>
                       <div className="text-white font-medium text-sm sm:text-base truncate">{winner.name}</div>
                       <div className="text-white/80 text-xs sm:text-sm truncate">{winner.event}</div>