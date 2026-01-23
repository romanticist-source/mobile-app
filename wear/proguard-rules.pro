# Add project specific ProGuard rules here.
# You can control the set of applied configuration files using the
# proguardFiles setting in build.gradle.kts.

# Keep Health Services classes
-keep class androidx.health.services.** { *; }
-keep interface androidx.health.services.** { *; }

# Keep Wear Compose classes
-keep class androidx.wear.compose.** { *; }

# Uncomment this to preserve the line number information for
# debugging stack traces.
-keepattributes SourceFile,LineNumberTable

# If you keep the line number information, uncomment this to
# hide the original source file name.
#-renamesourcefileattribute SourceFile
