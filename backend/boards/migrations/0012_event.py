# Generated by Django 3.0.6 on 2020-07-01 07:49

from django.db import migrations, models
import django.utils.timezone
import model_utils.fields


class Migration(migrations.Migration):

    dependencies = [
        ('boards', '0011_auto_20200517_1011'),
    ]

    operations = [
        migrations.CreateModel(
            name='Event',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', model_utils.fields.AutoCreatedField(default=django.utils.timezone.now, editable=False, verbose_name='created')),
                ('modified', model_utils.fields.AutoLastModifiedField(default=django.utils.timezone.now, editable=False, verbose_name='modified')),
                ('period', models.CharField(choices=[('WD', 'WorkDay'), ('WE', 'WeekEnd'), ('HO', 'Holiday')], default='WD', max_length=2)),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
