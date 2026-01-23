package com.example.wearapp

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.CircleShape
import androidx.wear.compose.foundation.lazy.ScalingLazyColumn
import androidx.wear.compose.foundation.lazy.rememberScalingLazyListState
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.health.services.client.data.DataTypeAvailability
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.wear.compose.material.MaterialTheme
import androidx.wear.compose.material.Text
import androidx.wear.compose.material.TimeText

@Composable
fun HealthScreen(
    viewModel: HealthViewModel = viewModel()
) {
    val uiState by viewModel.uiState.collectAsState()

    LaunchedEffect(Unit) {
        viewModel.startMeasuring()
    }

    val listState = rememberScalingLazyListState()

    Box(
        modifier = Modifier
            .fillMaxSize()
            .background(MaterialTheme.colors.background)
    ) {
        TimeText()

        ScalingLazyColumn(
            modifier = Modifier.fillMaxSize(),
            state = listState,
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            item {
                Spacer(modifier = Modifier.height(32.dp))
            }

            item {
                Text(
                    text = "Health Monitor",
                    style = MaterialTheme.typography.title3,
                    color = MaterialTheme.colors.primary,
                    textAlign = TextAlign.Center
                )
            }

            item {
                Spacer(modifier = Modifier.height(16.dp))
            }

            // 心拍数表示（常に表示）
            item {
                HealthMetricCard(
                    label = stringResource(R.string.heart_rate),
                    value = uiState.heartRate,
                    unit = stringResource(R.string.bpm),
                    availability = if (uiState.supportsHeartRate) uiState.heartRateAvailability else DataTypeAvailability.UNAVAILABLE,
                    color = Color(0xFFE91E63)
                )
            }

            item {
                Spacer(modifier = Modifier.height(8.dp))
            }

            // 歩数表示（常に表示）
            item {
                HealthMetricCard(
                    label = stringResource(R.string.steps),
                    value = uiState.steps?.toDouble(),
                    unit = stringResource(R.string.steps_unit),
                    availability = if (uiState.supportsSteps) uiState.stepsAvailability else DataTypeAvailability.UNAVAILABLE,
                    color = Color(0xFFFF9800)
                )
            }

            item {
                Spacer(modifier = Modifier.height(8.dp))
            }

            // HRV表示（常に表示）
            item {
                val hrvMetrics = uiState.hrvMetrics
                if (hrvMetrics != null) {
                    HRVMetricCard(
                        hrvMetrics = hrvMetrics,
                        color = Color(0xFF4CAF50)
                    )
                } else {
                    HRVMetricCardPlaceholder(
                        availability = if (uiState.supportsHRV) DataTypeAvailability.ACQUIRING else DataTypeAvailability.UNAVAILABLE,
                        color = Color(0xFF4CAF50)
                    )
                }
            }

            item {
                Spacer(modifier = Modifier.height(32.dp))
            }
        }
    }
}

@Composable
fun HealthMetricCard(
    label: String,
    value: Double?,
    unit: String,
    availability: DataTypeAvailability,
    color: Color,
    modifier: Modifier = Modifier
) {
    Column(
        modifier = modifier
            .fillMaxWidth()
            .padding(8.dp),
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Text(
            text = label,
            style = MaterialTheme.typography.caption1,
            color = MaterialTheme.colors.onBackground.copy(alpha = 0.7f),
            textAlign = TextAlign.Center
        )

        Spacer(modifier = Modifier.height(8.dp))

        Row(
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.Center
        ) {
            Box(
                modifier = Modifier
                    .size(8.dp)
                    .background(
                        color = when (availability) {
                            DataTypeAvailability.ACQUIRING -> Color.Yellow
                            DataTypeAvailability.AVAILABLE -> Color.Green
                            else -> Color.Gray
                        },
                        shape = CircleShape
                    )
            )

            Spacer(modifier = Modifier.size(12.dp))

            if (value != null && availability == DataTypeAvailability.AVAILABLE) {
                Text(
                    text = "${value.toInt()}",
                    fontSize = 36.sp,
                    fontWeight = FontWeight.Bold,
                    color = color,
                    textAlign = TextAlign.Center
                )

                Spacer(modifier = Modifier.size(4.dp))

                Text(
                    text = unit,
                    style = MaterialTheme.typography.caption1,
                    color = MaterialTheme.colors.onBackground.copy(alpha = 0.7f),
                    modifier = Modifier.padding(top = 12.dp)
                )
            } else {
                Text(
                    text = when (availability) {
                        DataTypeAvailability.ACQUIRING -> stringResource(R.string.measuring)
                        else -> "--"
                    },
                    fontSize = 36.sp,
                    fontWeight = FontWeight.Bold,
                    color = color.copy(alpha = 0.5f),
                    textAlign = TextAlign.Center
                )
            }
        }
    }
}

@Composable
fun HRVMetricCardPlaceholder(
    availability: DataTypeAvailability,
    color: Color,
    modifier: Modifier = Modifier
) {
    Column(
        modifier = modifier
            .fillMaxWidth()
            .padding(8.dp),
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Text(
            text = "HRV (SDNN)",
            style = MaterialTheme.typography.caption1,
            color = MaterialTheme.colors.onBackground.copy(alpha = 0.7f),
            textAlign = TextAlign.Center
        )

        Spacer(modifier = Modifier.height(8.dp))

        Row(
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.Center
        ) {
            Box(
                modifier = Modifier
                    .size(8.dp)
                    .background(
                        color = when (availability) {
                            DataTypeAvailability.ACQUIRING -> Color.Yellow
                            DataTypeAvailability.AVAILABLE -> Color.Green
                            else -> Color.Gray
                        },
                        shape = CircleShape
                    )
            )

            Spacer(modifier = Modifier.size(12.dp))

            Text(
                text = when (availability) {
                    DataTypeAvailability.ACQUIRING -> stringResource(R.string.measuring)
                    else -> "--"
                },
                fontSize = 36.sp,
                fontWeight = FontWeight.Bold,
                color = color.copy(alpha = 0.5f),
                textAlign = TextAlign.Center
            )
        }
    }
}

@Composable
fun HRVMetricCard(
    hrvMetrics: HRVMetrics,
    color: Color,
    modifier: Modifier = Modifier
) {
    Column(
        modifier = modifier
            .fillMaxWidth()
            .padding(8.dp),
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Text(
            text = "HRV (SDNN)",
            style = MaterialTheme.typography.caption1,
            color = MaterialTheme.colors.onBackground.copy(alpha = 0.7f),
            textAlign = TextAlign.Center
        )

        Spacer(modifier = Modifier.height(8.dp))

        Text(
            text = "${hrvMetrics.sdnn.toInt()}",
            fontSize = 36.sp,
            fontWeight = FontWeight.Bold,
            color = color,
            textAlign = TextAlign.Center
        )

        Spacer(modifier = Modifier.size(4.dp))

        Text(
            text = "ms",
            style = MaterialTheme.typography.caption1,
            color = MaterialTheme.colors.onBackground.copy(alpha = 0.7f)
        )

        Spacer(modifier = Modifier.height(8.dp))

        // Additional HRV metrics
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceEvenly
        ) {
            Column(horizontalAlignment = Alignment.CenterHorizontally) {
                Text(
                    text = "RMSSD",
                    style = MaterialTheme.typography.caption2,
                    color = MaterialTheme.colors.onBackground.copy(alpha = 0.5f)
                )
                Text(
                    text = "${hrvMetrics.rmssd.toInt()}ms",
                    style = MaterialTheme.typography.caption1,
                    color = color
                )
            }
            Column(horizontalAlignment = Alignment.CenterHorizontally) {
                Text(
                    text = "pNN50",
                    style = MaterialTheme.typography.caption2,
                    color = MaterialTheme.colors.onBackground.copy(alpha = 0.5f)
                )
                Text(
                    text = "${hrvMetrics.pnn50.toInt()}%",
                    style = MaterialTheme.typography.caption1,
                    color = color
                )
            }
        }
    }
}
